import LandingPage from "./screens/home/LandingPage";
// import ClassicsMenu from "./components/ClassicsMenu";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageCarousel2 from "./components/ImageCarousel2";
import Login from "./components/admin/Login";
import AdminPage from "./components/admin/AdminPage";
import Artists from "./screens/artists/Artists";
import AdminArtists from "./components/admin/AdminArtists";
import AdminPopupControl from "./components/admin/AdminPopupControl";
import Reserve from "./screens/reserve/Reserve";
// import MenuUpload from "./screens/menuUpload/MenuUpload";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/classics" element={<ClassicsMenu/>} /> */}
          <Route path="/" element={<LandingPage/>} />
          <Route path="/photos" element={<ImageCarousel2/>} />
          <Route path="/artists" element={<Artists/>} />
          <Route path="/reserve" element={<Reserve/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/admin/artists" element={<AdminArtists/>} />
          <Route path="/admin/popup" element={<AdminPopupControl/>} />
          {/* <Route path="/menuUploadTesting" element={<MenuUpload/>} /> */}
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
