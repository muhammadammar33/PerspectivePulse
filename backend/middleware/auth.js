const JWTService = require('../services/JWTService');
const User = require('../models/user');
const UserDTO = require('../dto/user');
const auth = async (req, res, next) => {
    try {
        const {refreshToken, accessToken} = req.cookies;
        if (!refreshToken || !accessToken) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        let _id;
        try {
            _id = JWTService.verifyAccessToken(accessToken)._id;
        } catch (error) {
            return next(error);
        }

        let user;
        try {
            user = await User.findOne({_id: _id});
            
        } catch (error) {
            return next(error);
        }
        const userDTO = new UserDTO(user);

        req.user = userDTO;
        next();
    } catch (error) {
        return next(error);
    }
    
}

module.exports = auth;