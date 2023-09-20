import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="content">
      <div className="loading">Loading</div>
      <div className="trigger"></div>
      <div className="section">
        <h1>Airplanes.</h1>
        <h3>The beginners guide.</h3>
        <p>You've probably forgotten what these are.</p>
        <div className="scroll-cta">Scroll</div>
      </div>

      <div className="section right">
        <h2>They're kinda like buses...</h2>
      </div>

      <div className="ground-container">
        <div className="parallax ground"></div>
        <div className="section right">
          <h2>..except they leave the ground.</h2>
          <p>Saaay what!?.</p>
        </div>

        <div className="section">
          <h2>They fly through the sky.</h2>
          <p>For realsies!</p>
        </div>

        <div className="section right">
          <h2>Defying all known physical laws.</h2>
          <p>It's actual magic!</p>
        </div>
        <div className="parallax clouds"></div>
      </div>

      <div className="blueprint">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <line id="line-length" x1="10" y1="80" x2="90" y2="80"></line>
          <path
            id="line-wingspan"
            d="M10 50, L40 35, M60 35 L90 50"
            // stroke-width="0.5"
          ></path>
          <circle
            id="circle-phalange"
            cx="60"
            cy="60"
            r="15"
            fill="transparent"
            // stroke-width="0.5"
          ></circle>
        </svg>
        <div className="section dark ">
          <h2>The facts and figures.</h2>
          <p>Lets get into the nitty gritty...</p>
        </div>
        <div className="section dark length">
          <h2>Length.</h2>
          <p>Long.</p>
        </div>
        <div className="section dark wingspan">
          <h2>Wing Span.</h2>
          <p>I dunno, longer than a cat probably.</p>
        </div>
        <div className="section dark phalange">
          <h2>Left Phalange</h2>
          <p>Missing</p>
        </div>
        <div className="section dark">
          <h2>Engines</h2>
          <p>Turbine funtime</p>
        </div>
      </div>
      <div className="sunset">
        <div className="section"></div>
        <div className="section end">
          <h2>Fin.</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
