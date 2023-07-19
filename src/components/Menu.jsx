import "../styles/menu.scss";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";
import SearchDrink from "./SearchDrink";
import DrinkObject from "./DrinkObject";

const Menu = () => {
    const [menu, setMenu] = useState({});

    useEffect(() => {
        setMenu(menuData[0]);
    }, []);

    return (
        <div className="menuContainer" id="menu">
            <h1 className="menuTitle">Menu</h1>
            <SearchDrink />
            {
                Object.keys(menu).map((drinkType) => {
                    return (
                        <div key={drinkType}>
                            <h2 className="drinkTitle" id={drinkType}>{drinkType}</h2>
                            <div className="drinksContainer cocktailsContainer" id={drinkType}>
                            {
                                Object.keys(menu[drinkType]).map((key) => {
                                    return (
                                        <DrinkObject key={key} 
                                        index={key} 
                                        title={menu[drinkType][key].title} 
                                        description={menu[drinkType][key].description}
                                        price={menu[drinkType][key].price} />
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