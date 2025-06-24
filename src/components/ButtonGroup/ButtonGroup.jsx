import styles from './ButtonGroup.module.scss';

function ButtonGroup({
  onNewPhrase,
  onToggleFavorites,
  showFavorites,
  onShareWhatsApp,
  onShareTwitter,
  onShareFacebook,
  onCopy,
}) {
  return (
    <div className={styles['button-group']}>
      <button className={styles['button-group__main']} onClick={onNewPhrase}>
        New Quote
      </button>

      <div className={styles['button-group__share']}>
        <button onClick={onShareWhatsApp} aria-label="WhatsApp">
          📱
        </button>
        <button onClick={onShareTwitter} aria-label="Twitter">
          🐦
        </button>
        <button onClick={onShareFacebook} aria-label="Facebook">
          📘
        </button>
        <button onClick={onCopy} aria-label="Copy">
          📋
        </button>
      </div>

      <button className={styles['button-group__toggle']} onClick={onToggleFavorites}>
        {showFavorites ? 'Hide favorites' : 'View favorites'}
      </button>
    </div>
  );
}

export default ButtonGroup;