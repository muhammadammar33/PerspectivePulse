const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/user");
const JWTService = require("../services/JWTService");
const RefreshToken = require("../models/token");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const authController = {
    async register(req, res, next) {
        const userRegisterSchema = Joi.object({
            name: Joi.string().min(5).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).min(8).max(30).required(),
            confirmPassword: Joi.ref('password')
        });
        const { error } = userRegisterSchema.validate(req.body);

        if (error){
            return next(error);
        }

        const { name, email, password } = req.body;
        try {
            const emailExist = await User.exists({ email });
            const nameExist = await User.exists({ name });
            if (nameExist) {
                const error = {
                    status: 409,
                    message: "Name not available, Use another one",
                };
                return next(error);
            }
            if (emailExist){
                const error = {
                    status: 409,
                    message: "Email already exists"
                }
                return next(error);
            }
            
        } catch (error) {
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let accessToken;
        let refreshToken;
        let newUser;

        try {
            newUser = new User({
                name,
                email,
                password: hashedPassword,
            });
            await newUser.save();

            accessToken = JWTService.signAccessToken({_id: newUser._id }, '30m');
            refreshToken = JWTService.signRefreshToken({ _id: newUser._id }, "60m");
        } catch (error) {
            return next(error);
        }

        await JWTService.storeRefreshToken(refreshToken, newUser._id);

        res.cookie('accessToken', accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });

        const userDto = new UserDTO(newUser);

        return res.status(201).json({ user: userDto, auth: true });

        // return res.status(201).json({
        //     message: "User created successfully",
        //     user: newUser,
        //     auth: true,
        // });

    },
    async login(req, res, next) {
        const userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).min(8).max(30).required(),
        });
        const { error } = userLoginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { email, password } = req.body;

        let user;
        try {
            user = await User.findOne({ email });
            if (!user) {
                const error = {
                    status: 401,
                    message: "User not found",
                };
                return next(error);
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                const error = {
                    status: 401,
                    message: "Invalid password",
                };
                return next(error);
            }
        } catch (error) {
            return next(error);
        }

        const accessToken = JWTService.signAccessToken({ _id: user._id }, '30m');
        const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
        
        try {
            await RefreshToken.updateOne({ _id: user._id }, { token: refreshToken }, { upsert: true });

        } catch (error) {
            return next(error);
        }
        
        res.cookie('accessToken', accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true
        });

        const userDto = new UserDTO(user);

        return res.status(200).json({ user: userDto, auth: true });

        // const userDTOData = new UserDTO(user);
        // return res.status(200).json({
        //     message: "Login successful",
        //     user: userDTOData,
        //     auth: true,
        // });
    },
    
    async logout(req, res, next) {
        // 1. delete refresh token from db
        // 2. response
        const { refreshToken } = req.cookies;
        try {
            await RefreshToken.deleteOne({ token: refreshToken });
        }
        catch (error) {
            return next(error);
        }
        res.clearCookie('accessToken');

        res.clearCookie('refreshToken');
        return res.status(200).json({
            user: null,
            message: "Logout successful",
            auth: false,
        });
    },

    async refresh(req, res, next) {
        // 1. get refreshToken from cookies
        // 2. verify refreshToken
        // 3. generate new tokens
        // 4. update db, return response

        const originalRefreshToken = req.cookies.refreshToken;

        let id;

        try {
        id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
        } catch (e) {
        const error = {
            status: 401,
            message: "Unauthorized",
        };

        return next(error);
        }

        try {
        const match = RefreshToken.findOne({
            _id: id,
            token: originalRefreshToken,
        });

        if (!match) {
            const error = {
            status: 401,
            message: "Unauthorized",
            };

            return next(error);
        }
        } catch (e) {
        return next(e);
        }

        try {
        const accessToken = JWTService.signAccessToken({ _id: id }, "30m");

        const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

        await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "None",
            secure: true
        });

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "None",
            secure: true
        });
        } catch (e) {
        return next(e);
        }

        const user = await User.findOne({ _id: id });

        const userDto = new UserDTO(user);

        return res.status(200).json({ user: userDto, auth: true });
    },
};

module.exports = authController;