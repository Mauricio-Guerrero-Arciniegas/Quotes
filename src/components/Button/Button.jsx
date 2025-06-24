import styles from './Button.module.scss';

function Button({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      New phrase
    </button>
  );
}

export default Button;