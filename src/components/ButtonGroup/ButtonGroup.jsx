import styles from './ButtonGroup.module.scss';
import {
  MessageCircle,
  Twitter,
  Facebook,
  ClipboardCopy
} from 'lucide-react';

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
      <button className={styles['button-group__action']} onClick={onNewPhrase}>
        Nueva frase
      </button>

      <button
        className={styles['button-group__action']}
        onClick={onToggleFavorites}
      >
        {showFavorites ? 'Ocultar favoritas' : 'Ver favoritas'}
      </button>

      <div className={styles['button-group__socials']}>
        <button onClick={onShareWhatsApp} aria-label="Share on WhatsApp">
          <MessageCircle size={24} color="#25d366" />
        </button>
        <button onClick={onShareTwitter} aria-label="Share on Twitter">
          <Twitter size={24} color="#1da1f2" />
        </button>
        <button onClick={onShareFacebook} aria-label="Share on Facebook">
          <Facebook size={24} color="#1877f2" />
        </button>
        <button onClick={onCopy} aria-label="Copy to clipboard">
          <ClipboardCopy size={24} color="#9b9b9b" />
        </button>
      </div>
    </div>
  );
}

export default ButtonGroup;