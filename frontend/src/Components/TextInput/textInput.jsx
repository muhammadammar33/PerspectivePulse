import styles from './textInput.module.css';

function textInput(props){
    return(
        <div className={styles.textInputWrapper}>
            <input {...props} />
            {props.error && <p className={styles.errorMessage}>{props.errorMessage}</p>}
        </div>
    );
}

export default textInput;