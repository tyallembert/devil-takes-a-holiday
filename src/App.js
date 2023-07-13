import Hero from './components/Hero';
import Menu from './components/Menu';
import Location from './components/Location';
import Footer from './components/Footer';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <Hero />
      <Location />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
