import "../styles/drinkObject.scss";
const DrinkObject =(props) => {

    return (
        <div key={props.index} className="menuItem">
            <div className="menuItemName">{props.title},</div>
            <div className="menuItemPrice">{props.price}</div>
            <div className="menuItemDescription">{props.description}</div>
        </div>
    )
}

export default DrinkObject;