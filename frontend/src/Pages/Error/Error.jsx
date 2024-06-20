import { Link } from "react-router-dom";
import styles from './Error.module.css'

function Error(){
    return (
        <div className={styles.error}>
            <h1>404 Error</h1>
            <p>Page not found</p>
            <Link to='/'>Home</Link>
        </div>
    )
}

export default Error;