import Hero from './components/Hero';
import Menu from './components/Menu';
import Location from './components/Location';
import Footer from './components/Footer';
import './styles/App.scss';
import Navigation from './components/Navigation';
// import TopBanner from './components/TopBanner';
import InstagramFeed from './components/InstagramFeed';

function App() {
  return (
    <div className="App">
      {/* <TopBanner /> */}
      <Navigation />
      <Hero />
      <Location />
      <Menu />
      <InstagramFeed />
      <Footer />
    </div>
  );
}

export default App;
