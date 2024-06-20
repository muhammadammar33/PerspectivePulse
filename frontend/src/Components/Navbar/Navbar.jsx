import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <NavLink to='/' className={`${styles.logo} ${styles.inactivelink}`}>Perspective Pulse</NavLink>
                <NavLink to='/blog' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}>Blog</NavLink>
                <NavLink to='/about' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}>About</NavLink>
                <NavLink to='/contact' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}>Contact</NavLink>
                <NavLink to='/login' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}><button className="loginButton">Log In</button></NavLink>
                <NavLink to='/signup' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}><button className="signupButton">Sign Up</button></NavLink>
            </nav>
            <div></div>
        </>
    );
}
export default Navbar;