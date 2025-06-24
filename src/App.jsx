import { useState } from 'react';
import phrases from './data/phrases.json';
import Quotes from './components/Quotes/Quotes';
import Button from './components/Button/Button';
import styles from './App.module.scss';

const backgrounds = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];

function App() {
  const getRandomIndex = (length) => Math.floor(Math.random() * length);

  const [currentPhrase, setCurrentPhrase] = useState(phrases[getRandomIndex(phrases.length)]);
  const [background, setBackground] = useState(backgrounds[getRandomIndex(backgrounds.length)]);

  const handleNewPhrase = () => {
    setCurrentPhrase(phrases[getRandomIndex(phrases.length)]);
    setBackground(backgrounds[getRandomIndex(backgrounds.length)]);
  };

  return (
    <div className={styles.app} style={{ backgroundImage: `url(/${background})` }}>
      <div className={styles['app__card']}>
        <Quotes phrase={currentPhrase.phrase} author={currentPhrase.author} />
        <Button onClick={handleNewPhrase} />
      </div>
    </div>
  );
}

export default App;