import "../styles/hero.scss";
import { DevilDrawing, TopText, BottomText } from "./SVGs"

const Hero = () => {
    return (
        <div className="heroContainer">
            <TopText />
            <DevilDrawing />
            <BottomText />
            <div className="timeContainer">
                <p className="time">4pm - 11pm, Sunday - Thursday</p>
                <p className="time">4pm - 1am, Friday - Saturday</p>
            </div>
        </div>
    )
}

export default Hero