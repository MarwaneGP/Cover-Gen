import './App.css';

import { useEffect, useRef, useState } from 'react';
import { Pane } from 'tweakpane';

function App() {
	const [isVisible, setIsVisible] = useState(false);
	const [isVisibleControl, setIsVisibleControl] = useState(false);
	const canvasRef = useRef(null);

	const toggleModal = () => {
		setIsVisible(!isVisible);
	};
	const toggleModalControl = () => {
		setIsVisibleControl(!isVisibleControl);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		const width = canvas.clientWidth * 2;
		const height = canvas.clientHeight * 2;

		canvas.width = width;
		canvas.height = height;

		const params = {
			GRID_SIZE: 35,
			LINE_COLOR: 'oklch(0.82% 0.792 136)' /* 'rgba(0, 255, 0, 0.8)' */, // Couleur néon vert
			LINE_SHADOW_COLOR: 'rgba(0, 255, 0, 0.5)',
			LINE_WIDTH: 2, // Épaisseur des lignes
			PERSPECTIVE: 1, // Facteur de perspective
			RANDOME_ANGLE: 6,

			STAR_COLOR: 'white',

			RANDOMIZE_CIRCLE_RADIUS: true,
			RANDOMIZE_CIRCLE_COLOR: false,
			COLOR_CIRCLE: 'red',
		};

		const pane = new Pane();

		// function drawCircle(ctx, x, y, radius) {
		// 	if (params.RANDOMIZE_CIRCLE_RADIUS) {
		// 		radius = radius * Math.random() * 2
		// 	}
		// 	ctx.beginPath()
		// 	ctx.arc(x, y, radius, 0, Math.PI * 2)
		// 	ctx.fillStyle = params.COLOR_CIRCLE
		// 	ctx.fill()
		// }

		function drawGridWithoutSVG() {
			if (!ctx) return;

			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, width, height);

			// Fond noir
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, width, height);

			// Ajout d'étoiles aléatoires
			ctx.fillStyle = params.STAR_COLOR;
			for (let i = 0; i < 150; i++) {
				const x = Math.random() * width;
				const y = Math.random() * height;
				ctx.fillRect(x, y, 2, 2);
			}

			// Style des lignes néon
			ctx.strokeStyle = params.LINE_COLOR;
			ctx.lineWidth = params.LINE_WIDTH;
			ctx.shadowColor = params.LINE_SHADOW_COLOR;
			ctx.shadowBlur = 90;

			const gridLines = params.GRID_SIZE;
			const randomAngle = (Math.random() * Math.PI) / params.RANDOME_ANGLE; // Angle aléatoire
			const randomPerspective = params.PERSPECTIVE + Math.random(); // Perspective aléatoire
			const centerX = width / 2;
			const centerY = height / 2;
			for (let i = -gridLines; i <= gridLines; i++) {
				const xOffset = Math.sin(randomAngle) * i * 25;
				const yOffset = Math.cos(randomAngle) * i * 25;

				ctx.beginPath();
				ctx.moveTo(centerX + xOffset, centerY - yOffset * randomPerspective);
				ctx.lineTo(centerX + xOffset * randomPerspective, height);
				ctx.stroke();
			}

			

			// Dessin des cercles
			/* for (let gridX = 0; gridX < width; gridX += cellSize) {
				for (let gridY = 0; gridY < height; gridY += cellSize) {
					drawCircle(
						ctx,
						gridX + cellSize / 2,
						gridY + cellSize / 2,
						cellSize / 2,
					)
				}
			} */
		}
		
		

		// Charger et dessiner l'image SVG
		const img = new Image();
		// Definir la taille de l'image
		const mult = 1.8;
		img.width = 300 * mult;
		img.height = 100 * mult;
		img.onload = () => {
			const randomX = Math.random() * (width - img.width);
			const randomY = Math.random() * (height - img.height);

			drawGridWithoutSVG();
			ctx.drawImage(img, randomX, randomY, img.width, img.height);
		};
		img.src = '/CombinationMark.svg';

		pane
			.addBinding(params, 'GRID_SIZE', { min: 1, max: 60, step: 1 })
			.on('change', drawGridWithoutSVG);
		pane
			.addBinding(params, 'RANDOMIZE_CIRCLE_RADIUS')
			.on('change', drawGridWithoutSVG);
		pane.addBinding(params, 'COLOR_CIRCLE').on('change', drawGridWithoutSVG);

		return () => {
			pane.dispose();
		};
	}, []);

	return (
		<>
			<header>
				<img
					id='bg-header'
					className='bg'
					src='./grille.svg'
					alt=''
				/>
				<img
					src='/CombinationMark.svg'
					alt=''
				/>
			</header>

			<main>
				<section className='wlcmSection'>
					<div>
						<img
							src='/LogoMark.svg'
							alt=''
						/>
						<h1>Cover Generator</h1>
					</div>
					<p className='welcomP'>
						Welcome to our promotional pop-up website for the upcoming album!
						Create and generate different covers to get unique and cool covers
						and share it <br /> with the fan base and your friends!
					</p>
					<div className='socialLinks'>
						<a
							href='#'
							target='_blank'>
							<img
								src='./instagramIcon.png'
								alt=''
							/>
						</a>
						<a
							href='#'
							target='_blank'>
							<img
								src='./X_icon.png'
								alt=''
							/>
						</a>
						<a
							href='#'
							target='_blank'>
							<img
								src='./facebookIcon.png'
								alt=''
							/>
						</a>
						<a
							href='#'
							target='_blank'>
							<img
								src='./youtubeIcon.png'
								alt=''
							/>
						</a>
					</div>
					<p className='explainP'>
						Use the different parameters like vintage photos, incongruous
						visuals and let the universe impact your creation, for a truly
						special cover. If you need inspiration listen to our most recent
						releases!
					</p>
					<div className='musicLinks'>
						<h3>Listen to the gem </h3>
						<a
							href='https://www.youtube.com/'
							target='_blank'>
							gem (Link 1)
						</a>
						<a
							href='https://www.youtube.com/'
							target='_blank'>
							gem (Link 2)
						</a>
					</div>
				</section>
				<button
					className={`toggle-storage-btn ${isVisible ? 'visible' : 'hidden'}`}
					onClick={toggleModal}>
					<img
						src='./arrow.png'
						alt=''
					/>
				</button>
				<button
					className={`toggle-controls-btn ${
						isVisibleControl ? 'visible' : 'hidden'
					}`}
					onClick={toggleModalControl}>
					<img
						src='./arrow.png'
						alt=''
					/>
				</button>

				<section className={`storage ${isVisible ? 'visible' : 'hidden'}`}>
					<h3>Storage</h3>
					<div>
						<div>Item 1</div>
						<div>Item 2</div>
						<div>Item 3</div>
						<div>Item 4</div>
					</div>
				</section>

				<section
					className={`controls ${isVisibleControl ? 'visible' : 'hidden'}`}>
					<h3>Controls</h3>
					<form>
						<label htmlFor='grid-size'>Grid Size:</label>
						<input
							type='range'
							id='grid-size'
							name='grid-size'
						/>
						<div>
							<label htmlFor='parameter1'>Parameter 1:</label>
							<input
								type='checkbox'
								id='parameter1'
								name='parameter1'
							/>
						</div>
						<div>
							<label htmlFor='parameter2'>Parameter 2:</label>
							<input
								type='checkbox'
								id='parameter2'
								name='parameter2'
							/>
						</div>
						<div>
							<label htmlFor='parameter3'>Parameter 3:</label>
							<input
								type='checkbox'
								id='parameter3'
								name='parameter3'
							/>
						</div>
						<div>
							<label htmlFor='parameter4'>Parameter 4:</label>
							<input
								type='checkbox'
								id='parameter4'
								name='parameter4'
							/>
						</div>
					</form>
				</section>
				<section className='cover-section'>
					<canvas
						ref={canvasRef}
						id='canvas'></canvas>
				</section>
			</main>
			<img
				id='bg-footer'
				className='bg'
				src='./grille.svg'
				alt=''
			/>

			<footer>
				<p>&copy; Marwane Ghalila &copy; Yannis G. Bikouta</p>
			</footer>
		</>
	);
}

export default App;
