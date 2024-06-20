import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
    const isAuth = false;
    return (
        <>
            <nav className={styles.navbar}>
                <NavLink to='/' className={`${styles.logo} ${styles.inactivelink}`}>Perspective Pulse</NavLink>
                <NavLink to='/' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}>Home</NavLink>
                <NavLink to='/blog' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}>Blog</NavLink>
                <NavLink to='/submitBlog' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}>Submit a Blog</NavLink>
                <NavLink to='/contact' className={({isActive}) => isActive ? styles.activelink : styles.inactivelink}>Contact</NavLink>
                {isAuth 
                ? 
                <div>
                    <NavLink to='/'>
                        <button className={styles.logoutButton}>Log Out</button>
                    </NavLink>
                </div> 
                : 
                <div>
                    <NavLink to='/login'>
                        <button className={styles.loginButton}>Log In</button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <button className={styles.signupButton}>Sign Up</button>
                    </NavLink>
                </div>}
            </nav>
            <div className={styles.separator}></div>
        </>
    );
}
export default Navbar;