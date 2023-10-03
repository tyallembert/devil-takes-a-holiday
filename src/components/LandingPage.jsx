import Hero from './Hero';
import Menu from './Menu';
import Location from './Location';
import Footer from './Footer';
import Navigation from './Navigation';
// import TopBanner from './components/TopBanner';
// import InstagramFeed from './InstagramFeed';

const LandingPage = () => {
    return (
        <div className='landingPage'>
            {/* <TopBanner /> */}
            <Navigation />
            <Hero />
            <Location />
            <Menu />
            {/* <InstagramFeed /> */}
            <Footer />
        </div>
    )
}

export default LandingPage;