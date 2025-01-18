import LandingPage from "./screens/home/LandingPage";
// import ClassicsMenu from "./components/ClassicsMenu";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageCarousel2 from "./components/ImageCarousel2";
import Login from "./screens/admin/Login";
import AdminPage from "./screens/admin/menu/AdminPage";
import Artists from "./screens/artists/Artists";
import AdminArtists from "./screens/admin/artists/AdminArtists";
import AdminPopupControl from "./screens/admin/popup/AdminPopupControl";
import Reserve from "./screens/reserve/Reserve";
import AdminSiteContent from "./screens/admin/home/AdminSiteContent";
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
          <Route path="/admin" element={<AdminSiteContent/>} />
          <Route path="/admin/menu" element={<AdminPage/>} />
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
