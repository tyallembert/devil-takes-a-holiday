import LandingPage from "./screens/home/LandingPage";
// import ClassicsMenu from "./components/ClassicsMenu";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageCarousel2 from "./components/ImageCarousel2";
import Login from "./screens/admin/Login";
import Artists from "./screens/artists/Artists";
import Reserve from "./screens/reserve/Reserve";
import AdminMenuLayout from "./screens/admin/menu/AdminMenuLayout";
import AdminHomeLayout from "./screens/admin/home/AdminHomeLayout";
import AdminArtistLayout from "./screens/admin/artists/AdminArtistLayout";
import AdminPopupLayout from "./screens/admin/popup/AdminPopupLayout";

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
          <Route path="/admin" element={<AdminHomeLayout/>} />
          <Route path="/admin/menu" element={<AdminMenuLayout/>} />
          <Route path="/admin/artists" element={<AdminArtistLayout/>} />
          <Route path="/admin/popup" element={<AdminPopupLayout/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
