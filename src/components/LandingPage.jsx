import Hero from './Hero';
import Menu from './Menu';
import Location from './Location';
import Footer from './Footer';
import Navigation from './Navigation';
import PopUp from './PopUp';
// import TopBanner from './components/TopBanner';
import InstagramFeed from './InstagramFeed';
// import ImageCarousel2 from './ImageCarousel2';

const LandingPage = () => {
    const showingPopup = true;
    return (
        <div className='landingPage'>
            {/* <TopBanner /> */}
            {
                showingPopup && <PopUp />
            
            }
            <Navigation />
            <Hero />
            <Location />
            {/* <ImageCarousel2 /> */}
            <Menu />
            <InstagramFeed />
            <Footer />
        </div>
    )
}

export default LandingPage;