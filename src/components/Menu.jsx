import "../styles/menu.scss";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";
// import SearchDrink from "./SearchDrink";
import DrinkObject from "./DrinkObject";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //           const response = await fetch('/.netlify/functions/get-menu');
    //           if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //           }
    //           const jsonData = await response.json();
    //           setMenu(jsonData);
    //         } catch (error) {
    //           console.error('Error fetching data:', error);
    //         }
    //       };
      
    //       fetchData();
    // }   
    // , []);
    useEffect(() => {
        setMenu(menuData[0]);
    }, []);

    return (
        <div className="menuContainer" id="drinks">
            <h1 className="menuTitle">Drinks</h1>
            {/* {
                menu.map((item, index) => {
                    return (
                        <div key={index}>
                            <h2 className="drinkTitle" id={item.drinkType.split(" ")[0]}>{item.drinkType}</h2>
                            <h3 className="tagLine">{item.tagLine}</h3>
                            <div className="drinksContainer cocktailsContainer" id={item.drinkType}>
                            {
                                item.drinks.map((drink, index) => {
                                    return (
                                        <DrinkObject key={index} 
                                        index={index} 
                                        title={drink.title} 
                                        description={drink.description}
                                        tagLine={drink.tagLine}
                                        price={drink.price} />
                                    );
                                })
                            }
                            </div>
                        </div>
                    );
                
                })
            } */}
            {
                Object.keys(menu).map((drinkType) => {
                    return (
                        <div key={drinkType}>
                        {drinkType === "Bits & Bobs" ? (<h1 className="menuTitle" id="food">Food</h1>):null}
                        <div>
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
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Menu;