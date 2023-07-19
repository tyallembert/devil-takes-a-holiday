import "../styles/map.scss";


const Map = () => {

    return (
        <div className="mapContainer">
            <iframe className="map" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.877539118117!2d-73.21683642364766!3d44.47668287107509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cca7bb305ac56e3%3A0x75dd91f0d5ce6d0!2sDevil%20Takes%20A%20Holiday!5e0!3m2!1sen!2sus!4v1689683855992!5m2!1sen!2sus" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="maskLayer"></div>
        </div>
    )
}

export default Map;