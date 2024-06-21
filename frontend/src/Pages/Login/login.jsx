import styles from './login.module.css';
// import textInput from '../../Components/TextInput/textInput';

function login() {
    <div className={styles.loginWrapper}>
        <div className={styles.loginHeader}>Log in to your Account</div>
        <textInput />
        <textInput />
        <button className={styles.loginButton}>Log in</button>
        <span className={styles.loginFooter}>Don't have an account? <button href='/signup'>Register</button></span>
    </div>
}

export default login;