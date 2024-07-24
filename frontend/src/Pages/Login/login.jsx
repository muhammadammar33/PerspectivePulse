import { useState } from "react";
import styles from "./login.module.css";
import TextInput from "../../Components/TextInput/textInput";
import loginSchema from "../../Schemas/loginSchema";
import { useFormik } from "formik";
import { login } from "../../api/internal";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const handleLogin = async () => {
        const data = {
        email: values.email,
        password: values.password,
        };

        const response = await login(data);

        if (response.status === 200) {
        // 1. setUser
        const user = {
            // _id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            auth: response.data.auth,
        };

        dispatch(setUser(user));
        // 2. redirect -> homepage
        navigate("/");
        } else if (response.code === "ERR_BAD_REQUEST") {
        // display error message
        setError(response.response.data.message);
        }
    };

    const { values, touched, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
        email: "",
        password: "",
        },

        validationSchema: loginSchema,
    });

    return (
        <div className={styles.loginWrapper}>
        <div className={styles.loginHeader}>Log in to your account</div>
        <TextInput
            type="text"
            value={values.email}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Email"
            error={errors.email && touched.email ? 1 : undefined}
            errormessage={errors.email}
        />
        <TextInput
            type="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Password"
            error={errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password}
        />
        <button
            className={styles.logInButton}
            onClick={handleLogin}
            disabled={
            !values.email ||
            !values.password ||
            errors.email ||
            errors.password
            }
        >
            Log In
        </button>
        <span>
            Don't have an account?{" "}
            <button
            className={styles.createAccount}
            onClick={() => navigate("/signup")}
            >
            Register
            </button>
        </span>
        {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
        </div>
    );
}

export default Login;