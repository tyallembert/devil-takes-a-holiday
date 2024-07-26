import "../../styles/menu.scss";
import { useState, useEffect } from "react";
import DrinkObject from "../../components/DrinkObject";
import { getMenu } from "../../utils/queries";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        getMenu().then((data) => {
            if(data.isError) {
                console.log(data.error)
            }else {
                setMenu(data);
            }
        });
    }, []);

    return (
        <section className="menuContainer" id="drinks">
            {
                menu.length > 0 ? (
                    menu.map((singleMenu, index) => {
                        return (
                            <div key={index}>
                                <div className="titleContainer">
                                    <h1 className="menuTitle"id={singleMenu.title.split(" ")[0]}>{singleMenu.title}</h1>
                                    <h2 className="menuTagLine">{singleMenu.tagLine}</h2>
                                </div>
                                {
                                    singleMenu.subMenu.map((subMenu, index) => {
                                        return (
                                            <div key={index}>
                                                <h2 className="drinkTitle" id={subMenu.title.split(" ")[0]}>{subMenu.title}</h2>
                                                <h3 className="tagLine">{subMenu.tagLine}</h3>
                                                <div className="drinksContainer cocktailsContainer" id={subMenu.title}>
                                                {
                                                    subMenu.menuItem.map((menuItem, index) => {
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
                ): null
                
            }
        </section>
    );
};

export default Menu;