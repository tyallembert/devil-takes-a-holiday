import { DevilDrawing } from "./SVGs"
import "../styles/footer.scss"

const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="svgContainer">
                <DevilDrawing />
            </div>
            <div className="linksContainer">
                <a href="#location">Location</a>
                <a href="#cocktails">Cocktails</a>
                <a href="#mocktails">Mocktails</a>
                <a href="#beer">Beer</a>
                <a href="#wine">Wine</a>
            </div>
            <div className="socialsContainer">
                <button>
                    <i className="fab fa-facebook-square"></i>
                </button>
                <button>
                    <i className="fab fa-facebook-square"></i>
                </button>
                <button>
                    <i className="fab fa-facebook-square"></i>
                </button>
            </div>
            <div className="copywriteInfo">
                <p>© 2023 Devil Takes a Holiday</p>
            </div>
        </div>
    )
}

export default Footer;