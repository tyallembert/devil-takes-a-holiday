import "../styles/drinkObject.scss";
const DrinkObject =(props) => {

    return (
        <div key={props.index} className="menuItem">
            <div className="menuItemName">{props.title}</div>
            <div className="menuItemDescription">
                {
                    typeof props.description === "object" ? props.description.map((line) => {
                        return <p>{line}</p>
                    }
                    ) : (
                        <p>{props.description}</p>
                    )
                }
                {
                    props.tagLine ? <span className="menuItemTagLine">{props.tagLine}</span> : null
                }
            </div>
        </div>
    )
}

export default DrinkObject;