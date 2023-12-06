import "../styles/menu.scss";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";
// import SearchDrink from "./SearchDrink";
import DrinkObject from "./DrinkObject";

const Menu = () => {
    const [menu, setMenu] = useState({});

    useEffect(() => {
        setMenu(menuData[0]);
    }, []);

    return (
        <div className="menuContainer" id="menu">
            <h1 className="menuTitle">Menu</h1>
            {
                Object.keys(menu).map((drinkType) => {
                    console.log(drinkType)
                    return (
                        <>
                        {drinkType === "Bits & Bobs" ? (<h1 className="menuTitle">Food</h1>) : null}
                        <div key={drinkType}>
                            <h2 className="drinkTitle" id={drinkType.split(" ")[0]}>{drinkType}</h2>
                            <h3 className="tagLine">{menu[drinkType].tagLine}</h3>
                            <div className="drinksContainer cocktailsContainer" id={drinkType}>
                            {
                                Object.keys(menu[drinkType]).map((key) => {
                                    if(drinkType === "tagLine") return null;
                                    return (
                                        <DrinkObject key={key} 
                                        index={key} 
                                        title={menu[drinkType][key].title} 
                                        description={menu[drinkType][key].description}
                                        tagLine={menu[drinkType][key].tagLine}
                                        price={menu[drinkType][key].price} />
                                    );
                                })
                            }
                            </div>
                        </div>
                        </>
                    );
                })
            }
        </div>
    );
};

export default Menu;