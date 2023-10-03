import "../styles/instagramFeed.scss";
const InstagramFeed = () => {
    return (
        <div className="instagramContainer">
            <h1 className="title">Follow Us On Instagram!</h1>
            {/* <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
            <div class="instagramFeed elfsight-app-0195c5b6-aaca-4655-8294-46ef1c01149e"></div> */}
            <iframe title="instagram" className="instagramFrame" src='https://widget-0195c5b6aaca4655829446ef1c01149e.elfsig.ht' width='100%' height='1000'></iframe>
        </div>
    )
}

export default InstagramFeed;