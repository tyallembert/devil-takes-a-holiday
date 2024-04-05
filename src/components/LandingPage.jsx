import Hero from './Hero';
import Menu from './Menu';
import Location from './Location';
import Footer from './Footer';
import Navigation from './Navigation';
import PopUp from './PopUp';
// import TopBanner from './TopBanner';
import InstagramFeed from './InstagramFeed';

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
            <Menu />
            <InstagramFeed />
            <Footer />
        </div>
    )
}

export default LandingPage;