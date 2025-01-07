import './App.css'
import React, { useEffect, useRef } from 'react';

const CanvasWithPerspectiveGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const gridSettings = {
      gridSize: 20,
      lineWidth: 1,
      lineColor: '#00FFFF',
      backgroundColor: '#000000',
    };

    const drawGrid = (ctx, canvas, settings) => {
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)); // Max distance to the center

      // Horizontal grid lines with skew and fade effect
      for (let y = 0; y <= canvas.height; y += settings.gridSize) {
        ctx.beginPath();
        
        // Apply perspective skew based on distance from the center
        const distance = Math.abs(centerY - y);
        const skew = distance * 0.1; // Skew factor
        const alpha = Math.max(0, 1 - distance / maxDistance); // Fade based on distance
        
        // Move line positions based on skew and fading effect
        ctx.moveTo(0 + skew, y);
        ctx.lineTo(canvas.width + skew, y);
        
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`; // Apply the fading
        ctx.lineWidth = settings.lineWidth;
        ctx.stroke();
      }

      // Vertical grid lines with skew and fade effect
      for (let x = 0; x <= canvas.width; x += settings.gridSize) {
        ctx.beginPath();

        // Apply perspective skew based on distance from the center
        const distance = Math.abs(centerX - x);
        const skew = distance * 0.1; // Skew factor
        const alpha = Math.max(0, 1 - distance / maxDistance); // Fade based on distance
        
        // Move line positions based on skew and fading effect
        ctx.moveTo(x, 0 + skew);
        ctx.lineTo(x, canvas.height + skew);
        
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`; // Apply the fading
        ctx.lineWidth = settings.lineWidth;
        ctx.stroke();
      }
    };

    drawGrid(ctx, canvas, gridSettings);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid(ctx, canvas, gridSettings);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }}></canvas>;
};

export default CanvasWithPerspectiveGrid;





{/* <header>
    <h1>Electronic Gems</h1>
  </header>
  <canvas id="top-grid"></canvas>

  <main>
    <section>
      <h2>Cover Generator</h2>
      <p>Welcome to our promotional pop-up website for the upcoming album! Create and generate different covers to get unique and cool covers and share it with the fan base and your friends!</p>
      <div>
        <a href="#" target="_blank">Instagram</a>
        <a href="#" target="_blank">Twitter</a>
        <a href="#" target="_blank">Facebook</a>
        <a href="#" target="_blank">YouTube</a>
      </div>
      <p>Use the different parameters like vintage photos, incongruous visuals and let the universe impact your creation, for a truly special cover. If you need inspiration listen to our most recent releases!</p>
      <div>
        <a href="https://www.youtube.com/" target="_blank">Listen to the gem (Link 1)</a>
        <a href="https://www.youtube.com/" target="_blank">Listen to the gem (Link 2)</a>
      </div>
    </section>

    <section>
      <h3>Storage</h3>
      <div>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </div>
    </section>

    <section>
      <h3>Cover</h3>
      <div>
        <p>Cover</p>
      </div>
    </section>

    <section>
      <h3>Controls</h3>
      <form>
        <label htmlFor="grid-size">Grid Size:</label>
        <input type="range" id="grid-size" name="grid-size"/>
        <div>
          <label htmlFor="parameter1">Parameter 1:</label>
          <input type="checkbox" id="parameter1" name="parameter1"/>
        </div>
        <div>
          <label htmlFor="parameter2">Parameter 2:</label>
          <input type="checkbox" id="parameter2" name="parameter2"/>
        </div>
        <div>
          <label htmlFor="parameter3">Parameter 3:</label>
          <input type="checkbox" id="parameter3" name="parameter3"/>
        </div>
        <div>
          <label htmlFor="parameter4">Parameter 4:</label>
          <input type="checkbox" id="parameter4" name="parameter4"/>
        </div>
      </form>
    </section>
  </main>
  <canvas id="bottom-grid"></canvas>
  <footer>
    <p>&copy; Marwane Ghalila &copy; Yannis Bikouta</p>
  </footer> */}