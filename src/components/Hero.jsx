import "../styles/hero.scss";
import { DevilDrawing, TopText, BottomText } from "./SVGs"

const Hero = () => {
    return (
        <div className="heroContainer">
            <TopText />
            <DevilDrawing />
            <BottomText />
        </div>
    )
}

export default Hero