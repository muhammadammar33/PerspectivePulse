import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../api/internal";
import { resetUser } from "../../store/userSlice";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.auth);

    const handleSignout = async () => {
        await signout();
        dispatch(resetUser());
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className={`${styles.navbar} ${menuOpen ? styles.showMenu : ''}`}>
                <div className={styles.menuIcon} onClick={toggleMenu}>
                    ☰
                </div>
                <NavLink to='/' className={`${styles.logo} ${styles.inactivelink}`}>Perspective Pulse</NavLink>
                <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
                    <NavLink to='/' className={({ isActive }) => isActive ? styles.activelink : styles.inactivelink}>Home</NavLink>
                    <NavLink to='/blog' className={({ isActive }) => isActive ? styles.activelink : styles.inactivelink}>Blogs</NavLink>
                    <NavLink to='/submitBlog' className={({ isActive }) => isActive ? styles.activelink : styles.inactivelink}>Submit a Blog</NavLink>
                    <NavLink to='/crypto' className={({ isActive }) => isActive ? styles.activelink : styles.inactivelink}>Crypto</NavLink>
                    {isAuth 
                    ? 
                    <div>
                        <NavLink to='/'>
                            <button className={styles.logoutButton} onClick={handleSignout}>Log Out</button>
                        </NavLink>
                    </div> 
                    : 
                    <div className={styles.buttons}>
                        <NavLink to='/login'>
                            <button className={styles.loginButton}>Log In</button>
                        </NavLink>
                        <NavLink to='/signup'>
                            <button className={styles.signupButton}>Sign Up</button>
                        </NavLink>
                    </div>}
                </div>
            </nav>
            <div className={styles.separator}></div>
        </>
    );
}

export default Navbar;
