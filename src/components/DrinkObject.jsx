import "../styles/drinkObject.scss";
const DrinkObject =(props) => {

    return (
        <div key={props.index} className="menuItem">
            <div className="menuItemName">{props.title}</div>
            <div className="menuItemDescription">
                {props.description}
                {
                    props.tagLine ? <span className="menuItemTagLine">{props.tagLine}</span> : null
                }
            </div>
        </div>
    )
}

export default DrinkObject;