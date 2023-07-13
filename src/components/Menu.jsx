import "../styles/menu.scss";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";

const Menu = () => {
    const [cocktails, setCocktails] = useState({});
    const [beers, setBeers] = useState({});
    const [wine, setWine] = useState({});
    const [mocktails, setMocktails] = useState({});

    useEffect(() => {
        setCocktails(menuData[0].cocktails);
        setMocktails(menuData[0].mocktails);
        setBeers(menuData[0].beers);
        setWine(menuData[0].wine);
    }, []);

    return (
        <div className="menuContainer">
            <h1 className="menuTitle">Menu</h1>
            <h2 className="drinkTitle cocktailsTitle">Cocktails</h2>
            <div className="drinksContainer cocktailsContainer" id="cocktails">
            {
                Object.keys(cocktails).map((key) => {
                    return (
                        <div key={key} className="menuItem">
                            <div className="menuItemName">{cocktails[key].title},</div>
                            <div className="menuItemPrice">{cocktails[key].price}</div>
                            <div className="menuItemDescription">{cocktails[key].description}</div>
                        </div>
                    );
                })
            }
            </div>
            <h2 className="drinkTitle mocktailsTitle">Mocktails</h2>
            <div className="drinksContainer mocktailsContainer" id="mocktails">
            {
                Object.keys(mocktails).map((key) => {
                    return (
                        <div key={key} className="menuItem">
                            <div className="menuItemName">{mocktails[key].title},</div>
                            <div className="menuItemPrice">{mocktails[key].price}</div>
                            <div className="menuItemDescription">{mocktails[key].description}</div>
                        </div>
                    );
                })
            }
            </div>
            <h2 className="drinkTitle wineTitle">Wine</h2>
            <div className="drinksContainer wineContainer" id="wine">
            {
                Object.keys(wine).map((key) => {
                    return (
                        <div key={key} className="menuItem">
                            <div className="menuItemName">{wine[key].title},</div>
                            <div className="menuItemPrice">{wine[key].price}</div>
                            <div className="menuItemDescription">{wine[key].description}</div>
                        </div>
                    );
                })
            }
            </div>
            <h2 className="drinkTitle beersTitle">Beers</h2>
            <div className="drinksContainer beersContainer" id="beers">
            {
                Object.keys(beers).map((key) => {
                    return (
                        <div key={key} className="menuItem">
                            <div className="menuItemName">{beers[key].title},</div>
                            <div className="menuItemPrice">{beers[key].price}</div>
                            <div className="menuItemDescription">{beers[key].description}</div>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
};

export default Menu;