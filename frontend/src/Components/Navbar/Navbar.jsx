import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <NavLink className={`${styles.logo} ${styles.inactivelink}`}>Perspective Pulse</NavLink>
                <NavLink>Home</NavLink>
                <NavLink>About</NavLink>
                <NavLink>Contact</NavLink>
            </nav>
            <div></div>
        </>
    );
}
export default Navbar;