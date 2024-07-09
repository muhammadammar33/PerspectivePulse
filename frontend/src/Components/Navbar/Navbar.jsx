import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import { useSelector } from "react-redux";
import { signout } from "../../api/internal";
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

function Navbar() {

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.auth);

    const handleSignout = async () => {
        await signout();
        dispatch(resetUser());
    };
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
                        <button className={styles.logoutButton} onClick={handleSignout}>Log Out</button>
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