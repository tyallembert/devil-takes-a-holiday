import "../styles/menu.scss";
import { useState, useEffect } from "react";
// import SearchDrink from "./SearchDrink";
import DrinkObject from "./DrinkObject";
import menuData from "../data/menu.json";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //           const response = await fetch('/.netlify/functions/menu-get');
    //           if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //           }
    //           const jsonData = await response.json();
    //           console.log(jsonData);
    //           setMenu(jsonData);
    //         } catch (error) {
    //           console.error('Error fetching data:', error);
    //         }
    //       };
      
    //       fetchData();
    // }   
    // , []);
    useEffect(() => {
        setMenu(menuData);
    }, []);

    return (
        <div className="menuContainer" id="drinks">
            {
                menu.map((singleMenu, index) => {
                    return (
                        <div key={index}>
                            <h1 className="menuTitle"id={singleMenu.title.split(" ")[0]}>{singleMenu.title}</h1>
                            {
                                singleMenu.subMenus.map((subMenu, index) => {
                                    return (
                                        <div key={index}>
                                            <h2 className="drinkTitle" id={subMenu.title.split(" ")[0]}>{subMenu.title}</h2>
                                            <h3 className="tagLine">{subMenu.tagLine}</h3>
                                            <div className="drinksContainer cocktailsContainer" id={subMenu.title}>
                                            {
                                                subMenu.menuItems.map((menuItem, index) => {
                                                    return (
                                                        <DrinkObject key={index} 
                                                        index={index} 
                                                        title={menuItem.title} 
                                                        description={menuItem.description}
                                                        tagLine={menuItem.tagLine} />
                                                    );
                                                })
                                            }
                                            </div>
                                        </div>
                                    );
                                }
                                )
                            }
                        </div>
                    );
                
                })
            }
            {/* {
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
            } */}
        </div>
    );
};

export default Menu;