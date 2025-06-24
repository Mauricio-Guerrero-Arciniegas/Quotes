import styles from './Quotes.module.scss';

function Quotes({ phrase, author }) {
  return (
    <div className={styles['quotes']}>
      <p className={styles['quotes__text']}>"{phrase}"</p>
      <p className={styles['quotes__author']}>- {author}</p>
    </div>
  );
}

export default Quotes;