import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import phrases from './data/phrases.json';
import styles from './App.module.scss';
import Quotes from './components/Quotes/Quotes';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import Loader from './components/Loader/Loader';

function App() {
	// Quotes
	const [isLoading, setIsLoading] = useState(true);
	const getRandomIndex = (length) => Math.floor(Math.random() * length);

	const handleNewPhrase = () => {
		setCurrentPhrase(phrases[getRandomIndex(phrases.length)]);
	};
	// Random Phrases
	const [currentPhrase, setCurrentPhrase] = useState(
		phrases[getRandomIndex(phrases.length)],
	);
	// Favorites
	const [favorites, setFavorites] = useState(() => {
		const stored = localStorage.getItem('favorites');
		return stored ? JSON.parse(stored) : [];
	});
	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);

	const [showFavorites, setShowFavorites] = useState(false);
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
	// Loader
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3500);
		return () => clearTimeout(timer);
	}, []);

	// Buttons Icons
	const handleShareWhatsApp = () => {
		const message = `"${currentPhrase.phrase}" - ${currentPhrase.author}`;
		const encoded = encodeURIComponent(message);
		window.open(`https://wa.me/?text=${encoded}`, '_blank');
	};

	const handleShareTwitter = () => {
		const message = `"${currentPhrase.phrase}" - ${currentPhrase.author}`;
		const encoded = encodeURIComponent(message);
		window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank');
	};

	const handleShareFacebook = () => {
		const message = `"${currentPhrase.phrase}" - ${currentPhrase.author}`;
		const encoded = encodeURIComponent(message);
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=&quote=${encoded}`,
			'_blank',
		);
	};

	const handleCopyToClipboard = () => {
		const message = `"${currentPhrase.phrase}" - ${currentPhrase.author}`;
		navigator.clipboard.writeText(message);
		alert('Copiado en Portapapeles !');
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<AnimatePresence>
					<motion.div
						className={styles.app}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
					>
						<motion.div
							className={`${styles['app__card']} ${
								isLoading ? styles['hidden-card'] : ''
							}`}
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 3, ease: 'easeOut' }}
						>
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
										<p style={{ color: 'white' }}>
											Aún no hay frases favoritas.
										</p>
									)}
								</div>
							)}
						</motion.div>
					</motion.div>
				</AnimatePresence>
			)}
		</>
	);
}

export default App;
