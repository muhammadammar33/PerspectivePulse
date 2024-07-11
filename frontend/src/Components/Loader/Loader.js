import styles from "./Loader.module.css";

function Loader({ text }) {
    return (
        <div className={styles.loaderWrapper}>
        <h2>Loading {text}</h2>
        </div>
    );
}

export default Loader;