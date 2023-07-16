import "../styles/menu.scss";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";

const Menu = () => {
    const [menu, setMenu] = useState({});

    useEffect(() => {
        setMenu(menuData[0]);
    }, []);

    return (
        <div className="menuContainer">
            <h1 className="menuTitle">Menu</h1>
            {
                Object.keys(menu).map((drinkType) => {
                    return (
                        <div key={drinkType}>
                            <h2 className="drinkTitle" id={drinkType}>{drinkType}</h2>
                            <div className="drinksContainer cocktailsContainer" id={drinkType}>
                            {
                                Object.keys(menu[drinkType]).map((key) => {
                                    return (
                                        <div key={key} className="menuItem">
                                            <div className="menuItemName">{menu[drinkType][key].title},</div>
                                            <div className="menuItemPrice">{menu[drinkType][key].price}</div>
                                            <div className="menuItemDescription">{menu[drinkType][key].description}</div>
                                        </div>
                                    );
                                })
                            }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Menu;