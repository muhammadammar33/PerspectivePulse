import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <>
            <div className={styles.separator}></div>
            <footer className={styles.footer}>
                <div>&copy; Perspective Pulse 2024</div>
            </footer>
        </>
    );
};

export default Footer;