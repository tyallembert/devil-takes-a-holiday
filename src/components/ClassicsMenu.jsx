import "../styles/menu.scss"
import menuData from "../data/classics-menu.json";
import DrinkObject from "./DrinkObject";
import { useState, useEffect } from "react";

const ClassicsMenu = () => {
    const [menu, setMenu] = useState({});

    useEffect(() => {
        setMenu(menuData[0]);
    }, []);
    return (
        <div className="menuContainer">
            <h1 className="menuTitle">Classics Menu</h1>
            {
                Object.keys(menu).map((key) => {
                    return (
                        <DrinkObject key={key} 
                        index={key} 
                        title={menu[key].title} 
                        description={menu[key].description}
                        price={menu[key].price} />
                    );
                })
            }
        </div>
    )
}

export default ClassicsMenu;