import LandingPage from "./components/LandingPage";
import ClassicsMenu from "./components/ClassicsMenu";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageCarousel2 from "./components/ImageCarousel2";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/classics" element={<ClassicsMenu/>} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/photos" element={<ImageCarousel2/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
