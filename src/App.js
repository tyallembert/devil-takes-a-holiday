import Hero from './components/Hero';
import Menu from './components/Menu';
import Location from './components/Location';
import Footer from './components/Footer';
import './styles/App.scss';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Location />
      <Menu />
      <Footer />
      {/* <LightsImage /> */}
    </div>
  );
}

export default App;
