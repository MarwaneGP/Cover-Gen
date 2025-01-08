import { useState } from 'react'
import './App.css'

import { useEffect, useRef } from 'react'
import { Pane } from 'tweakpane'

function App() {
	const [isVisible, setIsVisible] = useState(true)
	const canvasRef = useRef(null)

	const toggleModal = () => {
		setIsVisible(!isVisible)
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		const width = canvas.clientWidth * 2
		const height = canvas.clientHeight * 2

		canvas.width = width
		canvas.height = height

		const params = {
			GRID_SIZE: 10,
			RANDOMIZE_CIRCLE_RADIUS: true,
			RANDOMIZE_CIRCLE_COLOR: false,
			COLOR_CIRCLE: 'red',
		}

		const pane = new Pane()

		function drawCircle(ctx, x, y, radius) {
			if (params.RANDOMIZE_CIRCLE_RADIUS) {
				radius = radius * Math.random() * 2
			}
			ctx.beginPath()
			ctx.arc(x, y, radius, 0, Math.PI * 2)
			ctx.fillStyle = params.COLOR_CIRCLE
			ctx.fill()
		}

		function drawGrid() {
			if (!ctx) return
			ctx.clearRect(0, 0, width, height)
			const cellSize = width / params.GRID_SIZE

			// Dessin des lignes de la grille
			ctx.strokeStyle = 'red' // Couleur des lignes (grise, semi-transparente)
			ctx.lineWidth = 1

			// Lignes verticales
			for (let x = 0; x <= width; x += cellSize) {
				ctx.beginPath()
				ctx.moveTo(x, 0)
				ctx.lineTo(x, height)
				ctx.stroke()
			}

			// Lignes horizontales
			for (let y = 0; y <= height; y += cellSize) {
				ctx.beginPath()
				ctx.moveTo(0, y)
				ctx.lineTo(width, y)
				ctx.stroke()
			}

			// Dessin des cercles
			for (let gridX = 0; gridX < width; gridX += cellSize) {
				for (let gridY = 0; gridY < height; gridY += cellSize) {
					drawCircle(
						ctx,
						gridX + cellSize / 2,
						gridY + cellSize / 2,
						cellSize / 2,
					)
				}
			}
		}

		drawGrid()

		pane
			.addBinding(params, 'GRID_SIZE', { min: 1, max: 20, step: 1 })
			.on('change', drawGrid)
		pane.addBinding(params, 'RANDOMIZE_CIRCLE_RADIUS').on('change', drawGrid)
		pane.addBinding(params, 'COLOR_CIRCLE').on('change', drawGrid)

		return () => {
			pane.dispose()
		}
	}, [])

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
					<div>
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
					className={`toggle-btn ${isVisible ? 'visible' : 'hidden'}`}
					onClick={toggleModal}>
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

				<section>
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
				<section>
					<h3>Cover</h3>
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
	)
}

export default App
