import LandingPage from "./components/LandingPage";
import ClassicsMenu from "./components/ClassicsMenu";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { handleMouseActions } from './mouse-animation.js';
import rockOnImage from './images/rock-on.png';

function App() {
  useEffect(() => {
    handleMouseActions(rockOnImage);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/classics" element={<ClassicsMenu/>} />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
