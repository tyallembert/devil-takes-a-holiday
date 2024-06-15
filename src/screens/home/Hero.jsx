import "../../styles/hero.scss";
import { TopText, BottomText, DevilEyesOpen, DevilDrawing } from "../../components/SVGs";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const Hero = () => {
    const [hasAnimated, setHasAnimated] = useState(false);
    useEffect(() => {
        checkAnimationCookie();
    }, [])

    const checkAnimationCookie = () => {
        const cookies = new Cookies();
        const animatedCookie = cookies.get('hasAnimated');
        animatedCookie ? setHasAnimated(true): setHasAnimated(false);
        setTimeout(() => {
            cookies.set('hasAnimated', true, { path: '/', expires: new Date(Date.now()+(1000 * 60 * 10))});
        }, 1000)
    }
    return (
        <section className="heroContainer">
            <TopText hasAnimated={hasAnimated}/>
            {
                hasAnimated ? (
                    <DevilDrawing />
                ): (
                    <DevilEyesOpen />
                )
            }
            <BottomText hasAnimated={hasAnimated}/>
            <div className={`timeContainer ${'fadeAnimation'}`}>
                <p className="time">Monday - Thursday, 5pm - 12am</p>
                <p className="time">Friday Saturday, 4pm - 1am</p>
                <p className="time">Sunday, 5pm - 10pm</p>
            </div>
        </section>
    )
}

export default Hero