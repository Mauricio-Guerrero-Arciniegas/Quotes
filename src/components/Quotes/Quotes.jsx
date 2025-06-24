import styles from './Quotes.module.scss';

function Quotes({ phrase, author, onToggleFavorite, isFavorite }) {
  return (
    <div className={styles['quotes']}>
      <p className={styles['quotes__text']}>"{phrase}"</p>
      <p className={styles['quotes__author']}>- {author}</p>
     <button
  className={styles['quotes__fav-btn']}
  onClick={onToggleFavorite}
  aria-label="Toggle Favorite"
>
  <span className={styles['quotes__fav-icon']}>
    {isFavorite ? '❤️' : '🤍'}
  </span>
  <span className={styles['quotes__fav-text']}>
    {isFavorite ? 'Agregada' : 'Agregar a favoritas'}
  </span>
</button>
    </div>
  );
}

export default Quotes;