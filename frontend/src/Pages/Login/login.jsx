/* eslint-disable react-hooks/rules-of-hooks */
import styles from './login.module.css';
import TextInput from '../../Components/TextInput/textInput';
import { useFormik } from 'formik';
import loginSchema from '../../Schemas/loginSchema';

function login() {

    const {values, touched, handleBlur, handleChange, errors} = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginHeader}>Log In to your Account</div>
            <TextInput 
                type='text'
                name='username'
                value = {values.username}
                onBlur = {handleBlur}
                onChange = {handleChange}
                placeholder = 'Username'
                error = {errors.username && touched.username ? 1: undefined}
                errormessage = {errors.username}
            />
            <TextInput
                type='password'
                name='password'
                value = {values.password}
                onBlur = {handleBlur}
                onChange = {handleChange}
                placeholder = 'Password'
                error = {errors.password && touched.password ? 1: undefined}
                errormessage = {errors.password}
            />
            <button className={styles.logInButton}>Log In</button>
            <span>Don't have an account?{" "} <button className={styles.createAccount} href='/signup'>Register</button></span>
        </div>
    )
}

export default login;