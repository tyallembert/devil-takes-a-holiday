import Hero from './Hero';
import Menu from './Menu';
import Location from './Location';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import PopUp from '../../components/PopUp';
// import TopBanner from './TopBanner';
import InstagramFeed from '../../components/InstagramFeed';
import ToArtistLink from './ToArtistLink';

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
            <ToArtistLink />
            <Menu />
            <InstagramFeed />
            <Footer />
        </div>
    )
}

export default LandingPage;