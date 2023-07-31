import "../styles/hero.scss";
import { DevilDrawing, TopText, BottomText } from "./SVGs"

const Hero = () => {
    return (
        <div className="heroContainer">
            <TopText />
            <DevilDrawing />
            <BottomText />
            <div className="timeContainer">
                <p className="time">Monday - Thursday, 5pm - 12pm</p>
                <p className="time">Friday Saturday, 4pm - 1am</p>
                <p className="time">Sunday, 5pm - 10pm</p>
            </div>
        </div>
    )
}

export default Hero