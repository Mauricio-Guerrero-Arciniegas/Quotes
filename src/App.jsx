import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import phrases from './data/phrases.json';
import styles from './App.module.scss';
import Quotes from './components/Quotes/Quotes';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import Loader from './components/Loader/Loader';

function App() {
	// Loader
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 3500);
		return () => clearTimeout(timer);
	}, []);

	// Actual Quote
	const getRandomIndex = (length) => Math.floor(Math.random() * length);
	const [currentPhrase, setCurrentPhrase] = useState(
		phrases[getRandomIndex(phrases.length)],
	);

	const handleNewPhrase = () => {
		setCurrentPhrase(phrases[getRandomIndex(phrases.length)]);
	};

	// Favorites
	const [favorites, setFavorites] = useState(() => {
		const stored = localStorage.getItem('favorites');
		return stored ? JSON.parse(stored) : [];
	});
	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);

	const isFavorite = favorites.some((f) => f.phrase === currentPhrase.phrase);
	const toggleFavorite = () => {
		if (isFavorite) {
			setFavorites(favorites.filter((f) => f.phrase !== currentPhrase.phrase));
		} else {
			setFavorites([...favorites, currentPhrase]);
		}
	};

	const [showFavorites, setShowFavorites] = useState(false);
	const handleToggleFavorites = () => setShowFavorites((prev) => !prev);

	// Share social icons
	const getEncodedMessage = () =>
		encodeURIComponent(`"${currentPhrase.phrase}" - ${currentPhrase.author}`);

	const handleShareWhatsApp = () => {
		window.open(`https://wa.me/?text=${getEncodedMessage()}`, '_blank');
	};

	const handleShareTwitter = () => {
		window.open(`https://twitter.com/intent/tweet?text=${getEncodedMessage()}`, '_blank');
	};

	const handleShareFacebook = () => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=&quote=${getEncodedMessage()}`,
			'_blank',
		);
	};

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(`"${currentPhrase.phrase}" - ${currentPhrase.author}`);
		alert('Copiado en portapapeles!');
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
							className={styles['app__card']}
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
										<p className={styles['app__no-favorites']}>
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