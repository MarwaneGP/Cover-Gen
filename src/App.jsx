import './App.css'
import { Pane } from 'tweakpane';



function App() {

  
  return (
    <>

  <header>
    <img id='bg-header' className='bg' src="./grille.svg" alt="" />
    <img src="./title.png" alt="" />
  </header>
  <canvas id="top-grid"></canvas>

  <main>
    <section className='wlcmSection'>
      <div>
        <img src="./logo.png" alt="" />
        <h1>Cover Generator</h1>
      </div>
      <p className='welcomP'>Welcome to our promotional pop-up website for the upcoming album! Create and generate different covers to get unique and cool covers and share it <br/> with the fan base and your friends!</p>
      <div className='socialLinks'>
        <a href="#" target="_blank" ><img src="./instagramIcon.png" alt="" /></a>
        <a href="#" target="_blank"><img src="./X_icon.png" alt="" /></a>
        <a href="#" target="_blank"><img src="./facebookIcon.png" alt="" /></a>
        <a href="#" target="_blank"><img src="./youtubeIcon.png" alt="" /></a>
      </div>
      <p className='explainP'>Use the different parameters like vintage photos, incongruous visuals and let the universe impact your creation, for a truly special cover. If you need inspiration listen to our most recent releases!</p>
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
  <img id='bg-footer' className='bg' src="./grille.svg" alt="" />

  <footer>
    <p>&copy; Marwane Ghalila &copy; Yannis Bikouta</p>
  </footer>


    </>
  )
}

export default App
