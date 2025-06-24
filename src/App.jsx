import { useState, useEffect } from 'react';
import phrases from './data/phrases.json';
import styles from './App.module.scss';
import Quotes from './components/Quotes/Quotes';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';

const gradients = [
  'linear-gradient(135deg, rgba(255, 236, 210, 0.85), rgba(252, 182, 159, 0.85))',
  'linear-gradient(135deg, rgba(161, 196, 253, 0.85), rgba(194, 233, 251, 0.85))',
  'linear-gradient(135deg, rgba(251, 194, 235, 0.85), rgba(166, 193, 238, 0.85))',
  'linear-gradient(135deg, rgba(212, 252, 121, 0.85), rgba(150, 230, 161, 0.85))',
  'linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85))',
];

function App() {
  const getRandomIndex = (length) => Math.floor(Math.random() * length);

  const [currentPhrase, setCurrentPhrase] = useState(
    phrases[getRandomIndex(phrases.length)]
  );
  const [cardBg, setCardBg] = useState(
    gradients[getRandomIndex(gradients.length)]
  );
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleNewPhrase = () => {
    setCurrentPhrase(phrases[getRandomIndex(phrases.length)]);
    setCardBg(gradients[getRandomIndex(gradients.length)]);
  };

  const toggleFavorite = () => {
    const exists = favorites.find((f) => f.phrase === currentPhrase.phrase);
    if (exists) {
      setFavorites(favorites.filter((f) => f.phrase !== currentPhrase.phrase));
    } else {
      setFavorites([...favorites, currentPhrase]);
    }
  };

  const isFavorite = favorites.some((f) => f.phrase === currentPhrase.phrase);
  const handleToggleFavorites = () => setShowFavorites((prev) => !prev);

  const handleShareWhatsApp = () => {
    const message = `"${currentPhrase.phrase}" - ${currentPhrase.author}`;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    const message = `"${currentPhrase.phrase}" - ${currentPhrase.author}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank');
  };

  const handleShareFacebook = () => {
    const message = `"${currentPhrase.phrase}" - ${currentPhrase.author}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=&quote=${encoded}`, '_blank');
  };

  const handleCopyToClipboard = () => {
    const message = `"${currentPhrase.phrase}" - ${currentPhrase.author}`;
    navigator.clipboard.writeText(message);
    alert('Copied to clipboard!');
  };

  return (
    <div className={styles.app}>
      <div className={styles['app__card']} style={{ background: cardBg }}>
        <Quotes
          phrase={currentPhrase.phrase}
          author={currentPhrase.author}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />

        <ButtonGroup
          onNewPhrase={handleNewPhrase}
          onToggleFavorites={handleToggleFavorites}
          showFavorites={showFavorites}
          onShareWhatsApp={handleShareWhatsApp}
          onShareTwitter={handleShareTwitter}
          onShareFacebook={handleShareFacebook}
          onCopy={handleCopyToClipboard}
        />

        {showFavorites && (
          <div className={styles['app__favorites-list']}>
            {favorites.length > 0 ? (
              favorites.map((fav, index) => (
                <div key={index} className={styles['app__favorite-item']}>
                  <p>"{fav.phrase}"</p>
                  <span>- {fav.author}</span>
                </div>
              ))
            ) : (
              <p>No favorites yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;