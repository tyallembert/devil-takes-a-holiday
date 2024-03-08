import { useState } from "react";
import "../styles/AdminPage.scss";
import { MdEdit } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Login from "./Login";


const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [menu, setMenu] = useState([]);
    // const [menu, setMenu] = useState([
    //     {
    //         id: "1",
    //         title: "Drinks",
    //         subMenus: [
    //             {
    //                 id: "1",
    //                 title: "Godless, Good, & Gracious",
    //                 tagLine: "(We Devils are grateful for all of you; Thank you for making our demon dreams a reality!)",
    //                 menuItems: [
    //                     {
    //                         id: "1",
    //                         title: "The Devil's Margarita",
    //                         description: "Tequila, lime, agave, and a splash of orange juice",
    //                         tagLine: "",
    //                         order: 0
    //                     },
    //                     {
    //                         id: "2",
    //                         title: "Diners, Drive-ins & Ryes",
    //                         description: "A toasted rye bread, bourbon & rum milk punch with chipotle maple coffee.",
    //                         tagLine: "",
    //                         order: 1
    //                     },
    //                     {
    //                         id: "3",
    //                         title: "Just the (Spruce) Tip",
    //                         description: "St George Terroir gin, Norden's Aquavit, Devil-made spruce syrup, lemon, seltzer, cava.",
    //                         tagLine: "",
    //                         order: 2
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]);
    const [showingDeletePopup, setShowingDeletePopup] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const [deleteID, setDeleteID] = useState('');
    const [editingElement, setEditingElement] = useState({type: '', id: ''});

    const checkLogin = async (admin) => {
        if(admin) {
            if(admin) {
                const response = await fetch('/.netlify/functions/menu-get');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setMenu(jsonData);
            }
            setIsAdmin(true);
        }
    }
    const saveMenuItemOrder = async (menuItemID, newOrder, adjacentID, adjacentOrder) => {
        const response = await fetch('/.netlify/functions/menuitem-order', {
            method: 'POST',
            body: JSON.stringify({
                order: newOrder, 
                menuItemID: menuItemID,
                adjacentID: adjacentID,
                adjacentOrder: adjacentOrder
            })
        });
        if (!response.ok) {
            throw new Error('Failed to update menu');
        }
    }

    const menuItemOrderDown = (menuID, subMenuID, menuItemID) => {
        let newOrder = -1;
        let adjacentID = -1;
        let adjacentOrder = -1;
        const newMenu = menu.map((item) => {
            if(item.id === menuID) {
                const newSubMenu = item.subMenus.map((subMenu) => {
                    if(subMenu.id === subMenuID) {
                        subMenu.menuItems = subMenu.menuItems.map((menuItem, index) => {
                            if(menuItem.id === menuItemID) {
                                if(index === subMenu.menuItems.length - 1) {
                                    return menuItem;
                                }
                                menuItem.order = menuItem.order + 1;
                                subMenu.menuItems[index + 1].order = subMenu.menuItems[index + 1].order - 1;
                                newOrder = menuItem.order;
                                adjacentID = subMenu.menuItems[index + 1].id;
                                adjacentOrder = subMenu.menuItems[index + 1].order;
                            }
                            return menuItem;
                        });
                    }
                    subMenu.menuItems = sortMenuItems(subMenu.menuItems);
                    return subMenu;
                });
                item.subMenus = newSubMenu;
            }
            return item;
        });
        setMenu(newMenu);
        if(newOrder !== -1){
            saveMenuItemOrder(menuItemID, newOrder, adjacentID, adjacentOrder);
        }
    }
    const menuItemOrderUp = (menuID, subMenuID, menuItemID) => {
        let newOrder = -1;
        let adjacentID = -1;
        let adjacentOrder = -1;
        const newMenu = menu.map((item) => {
            if(item.id === menuID) {
                const newSubMenu = item.subMenus.map((subMenu) => {
                    if(subMenu.id === subMenuID) {
                        subMenu.menuItems = subMenu.menuItems.map((menuItem, index) => {
                            if(menuItem.id === menuItemID) {
                                if(index === 0) {
                                    return menuItem;
                                }
                                menuItem.order = menuItem.order - 1;
                                subMenu.menuItems[index - 1].order = subMenu.menuItems[index - 1].order + 1;
                                newOrder = menuItem.order;
                                adjacentID = subMenu.menuItems[index - 1].id;
                                adjacentOrder = subMenu.menuItems[index - 1].order;
                            }
                            return menuItem;
                        });
                    }
                    subMenu.menuItems = sortMenuItems(subMenu.menuItems);
                    return subMenu;
                });
                item.subMenus = newSubMenu;
            }
            return item;
        }
        );
        setMenu(newMenu);
        if(newOrder !== -1){
            saveMenuItemOrder(menuItemID, newOrder, adjacentID, adjacentOrder);
        }
    }
    const sortMenuItems = (menuItems) => {
        return menuItems.sort((a, b) => a.order - b.order);
    }
    // function that handles adding a new menu
    const addNewMenu = (newMenu, wasNew) => {
        console.log(newMenu);
        if(wasNew || newMenu.subMenus === undefined) {
            newMenu = {...newMenu, subMenus: []}
        }
        if(wasNew) {
            setMenu([...menu, newMenu]);
        }else {
            const menuCopy = menu.map((item) => {
                if (item.id === newMenu.id) {
                    return {...item, title: newMenu.title};
                }
                return item;
            }
            );
            setMenu(menuCopy);
        }
    }
    // function that handles adding a new submenu
    const addNewSubMenu = (newSubmenu, wasNew) => {
        if(wasNew) {
            newSubmenu = {...newSubmenu, menuItems: []};
        }
        const newMenu = menu.map((item) => {
            if (item.id === newSubmenu.menuId) {
                if(wasNew) {
                    return { ...item, subMenus: [...item.subMenus, newSubmenu] };
                }
                else {
                    const newSubMenus = item.subMenus.map((subItem) => {
                        if (subItem.id === newSubmenu.id) {
                          return {...subItem, title: newSubmenu.title, tagLine: newSubmenu.tagLine}; // Replace matching submenu
                        }
                        return subItem; // Keep other submenus intact
                    });
                    return { ...item, subMenus: newSubMenus };
                }
            }
            return item;
        });
        setMenu(newMenu);
    }
    // function that handles adding a new menu item
    const addNewMenuItem = (newItem, wasNew) => {
        const newMenu = menu.map((item) => {
            const newSubMenu = item.subMenus.map((subMenu) => {
                if(subMenu.id === newItem.subMenuId) {
                    if(wasNew) {
                        subMenu.menuItems.push(newItem);
                    } else {
                        subMenu.menuItems = subMenu.menuItems.map((menuItem) => {
                            if(menuItem.id === newItem.id) {
                                return newItem;
                            }
                            return menuItem;
                        });
                    }
                }
                return subMenu;
            });
            item.subMenus = newSubMenu;
            return item;
        });
        setMenu(newMenu);
    }
    const handleDelete = (menuID, menuType) => {
        if(menuType === 'menu' || menuType === 'submenu') {
            setDeleteType(menuType);
            setDeleteID(menuID);
            setShowingDeletePopup(true);
        } else {
            deleteMenu(menuID, menuType);
        }
    }
    // function that handles deleting a menu
    const deleteMenu = async (menuID, menuType) => {
        if(showingDeletePopup) {
            setShowingDeletePopup(false);
        }
        let url = '';
        if(menuType === 'menu') {
            url = '/.netlify/functions/menu-delete';
        }else if (menuType === 'submenu') {
            url = '/.netlify/functions/submenu-delete';
        } else if (menuType === 'menuitem') {
            url = '/.netlify/functions/menuitem-delete';
        }
        if(url === '') {
            throw new Error('Invalid menu type');
        }
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({ id: menuID})
        });
        if (!response.ok) {
            throw new Error('Failed to delete menu');
        }
        if(menuType === 'menu') {
            setMenu(menu.filter((item) => item.id !== menuID));
        }else if (menuType === 'submenu') {
            const newMenu = menu.map((item) => {
                item.subMenus = item.subMenus.filter((subMenu) => subMenu.id !== menuID);
                return item;
            });
            setMenu(newMenu);
        } else if (menuType === 'menuitem') {
            const newMenu = menu.map((item) => {
                const newSubMenu = item.subMenus.map((subMenu) => {
                    subMenu.menuItems = subMenu.menuItems.filter((menuItem) => menuItem.id !== menuID);
                    return subMenu;
                });
                item.subMenus = newSubMenu;
                return item;
            });
            setMenu(newMenu);
        }
    }

    if(isAdmin) {
        return (
            <div className="adminContainer">
                <div className={`${"deletePopup"} ${showingDeletePopup ? "showing": "hidden"}`}>
                    <h2>Are you sure you want to delete an entire {deleteType}?</h2>
                    <div className="buttonsContainer">
                        <button className="yesButton" onClick={() => deleteMenu(deleteID, deleteType)}>Yes</button>
                        <button className="noButton" onClick={() => setShowingDeletePopup(false)}>No</button>
                    </div>
                </div>
                <div className="mainHeader">
                    <h2>Admin</h2>
                    <a href="https://youtu.be/wbYdfUbSrr8" target="_blank" rel="noreferrer" className="tutorialLink">Tutorial</a>
                </div>
                <div className="menusContainer">
                    <NewMenu addNewMenu={addNewMenu}/>
                    {
                        menu.map((singleMenu, i) => {
                            return (
                                <div key={i} className="menuContainer">
                                    {
                                        editingElement.type === 'menu' && editingElement.id === singleMenu.id ? (
                                            <NewMenu 
                                            addNewMenu={addNewMenu} 
                                            elementInfo={singleMenu}
                                            setEditingElement={setEditingElement}/>
                                        ): (
                                        <div className="header">
                                            <h1>{singleMenu.title}</h1>
                                            <button className="editButton" onClick={() => setEditingElement({ type: "menu", id: singleMenu.id})}><MdEdit/></button>
                                            <button className="removeButton" onClick={() => handleDelete(singleMenu.id, "menu")}>X</button>
                                        </div>
                                        )
                                    }
                                    <NewSubMenu menuID={singleMenu.id} addNewMenu={addNewSubMenu} menuType={singleMenu.title}/>
                                    <div className="subMenuContainer">
                                        {
                                            singleMenu.subMenus.map((subMenu, j) => {
                                                return (
                                                    <div key={j} className="subMenu">
                                                        {
                                                            editingElement.type === 'subMenu' && editingElement.id === subMenu.id ? (
                                                                <NewSubMenu 
                                                                menuID={singleMenu.id} 
                                                                addNewMenu={addNewSubMenu} 
                                                                menuType={singleMenu.title} 
                                                                elementInfo={subMenu}
                                                                setEditingElement={setEditingElement}/>
                                                            ): (
                                                                <>
                                                                <div className="header">
                                                                    <h2>{subMenu.title}</h2>
                                                                    <button className="editButton" onClick={() => setEditingElement({ type: "subMenu", id: subMenu.id})}><MdEdit/></button>
                                                                    <button className="removeButton" onClick={() => handleDelete(subMenu.id, "submenu")}>X</button>
                                                                </div>
                                                                <p>{subMenu.tagLine}</p>
                                                                </>
                                                            )
                                                        }
                                                        <NewMenuItem 
                                                        subMenuID={subMenu.id} 
                                                        addNewMenu={addNewMenuItem} 
                                                        submenuType={subMenu.title}
                                                        itemsLength={subMenu.menuItems.length}/>
                                                        <div className="menuItemContainer">
                                                            {
                                                                subMenu.menuItems.map((menuItem, k) => {
                                                                    return (
                                                                        <div key={k} className="menuItem">
                                                                            {
                                                                                editingElement.type === 'menuItem' && editingElement.id === menuItem.id ? (
                                                                                    <NewMenuItem 
                                                                                    subMenuID={subMenu.id} 
                                                                                    addNewMenu={addNewMenuItem} 
                                                                                    submenuType={subMenu.title}
                                                                                    elementInfo={menuItem}
                                                                                    setEditingElement={setEditingElement}/>
                                                                                ): (
                                                                                    <>
                                                                                    <h3>{menuItem.title}</h3>
                                                                                    <p>{menuItem.description}</p>
                                                                                    <p className="tagLine">{menuItem.tagLine}</p>
                                                                                    <p>{menuItem.order}</p>
                                                                                    <div className="arrowsContainer">
                                                                                        <button className="leftButton" onClick={() => menuItemOrderUp(singleMenu.id, subMenu.id, menuItem.id)}><IoIosArrowBack/></button>
                                                                                        <button className="rightButton" onClick={() => menuItemOrderDown(singleMenu.id, subMenu.id, menuItem.id)}><IoIosArrowForward/></button>
                                                                                    </div>
                                                                                    <div className="buttonsContainer">
                                                                                        <button className="editButton" onClick={() => setEditingElement({type: "menuItem", id: menuItem.id})}><MdEdit/></button>
                                                                                        <button className="removeButton" onClick={() => handleDelete(menuItem.id, "menuitem")}>X</button>
                                                                                    </div>
                                                                                    </>
                                                                                )
                                                                            }
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
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }else {
        return <Login checkLogin={checkLogin}/>
    }
}

export default AdminPage;

// === NewMenu ===
const NewMenu = ({ addNewMenu, elementInfo, setEditingElement }) => {
    const [showing, setShowing] = useState(elementInfo ? true : false);
    const [data, setData] = useState({
        title: elementInfo ? elementInfo.title :'',
        id: elementInfo ? elementInfo.id : -1
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const closePopup = (e) => {
        e.preventDefault();
        setShowing(false);
        if(elementInfo) {
            setEditingElement({ type: '', id: ''});
        }
    }
    const handleNewMenu = async (event) => {
        event.preventDefault();
        const response = await fetch('/.netlify/functions/menu-add', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to add menu');
        }
        const jsonData = await response.json();
        const wasNew = elementInfo ? false : true;
        setShowing(false);
        setData({ title: '', id: ''});
        if(elementInfo) {
            setEditingElement({ type: '', id: ''});
        }
        addNewMenu(jsonData, wasNew);
    }
    return (
        <>
        {
            showing ? (
                <form className={`${"menuForm"} ${elementInfo ? "updateForm": ""}`} onSubmit={handleNewMenu}>
                    {
                        elementInfo ? null: (
                            <p>Add a new menu</p>
                        )
                    }
                    <div className="inputContainer">
                        <label htmlFor="title">Title</label>
                        <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={data.title}
                        onChange={handleChange}/>
                    </div>
                    {
                        elementInfo ? (
                            <button type="submit" className="submitButton">Update</button>
                        ): (
                            <button type="submit" className="submitButton">Add</button>
                        )
                    }
                    <button type="butter" className="cancelButton" onClick={closePopup}>Cancel</button>
                </form>
            ): (
                <button className="openButton" onClick={() => setShowing(true)}>New Menu</button>
            )
        }
        </>
    );
}

// === NewSubMenu ===
const NewSubMenu = ({ menuID, addNewMenu, menuType, elementInfo, setEditingElement }) => {
    const [showing, setShowing] = useState(elementInfo ? true : false);
    const [data, setData] = useState({ 
        menuID: menuID, 
        subMenuID: elementInfo ? elementInfo.id : -1,
        title: elementInfo ? elementInfo.title : '', 
        tagLine: elementInfo ? elementInfo.tagLine : ''
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const closePopup = (e) => {
        e.preventDefault();
        setShowing(false);
        if(elementInfo) {
            setEditingElement({ type: '', id: ''});
        }
    }
    const handleNewMenu = async (event) => {
        event.preventDefault();
        const response = await fetch('/.netlify/functions/submenu-add', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to add menu');
        }
        const jsonData = await response.json();
        const wasNew = elementInfo ? false : true;
        setShowing(false);
        setData({
            menuID: menuID,
            subMenuID: '',
            title: '',
            tagLine: ''
        });
        if(elementInfo) {
            setEditingElement({ type: '', id: ''});
        }
        addNewMenu(jsonData, wasNew);
    }
    return (
        <>
        {
            showing ? (
                <form className={`${"menuForm"} ${elementInfo ? "updateForm": ""}`} onSubmit={handleNewMenu}>
                    {
                        elementInfo ? null: (
                            <p>Add a new section under the <span className="typeSpan">"{menuType}"</span> menu</p>
                        )
                    }
                    <div className="inputContainer">
                        <label htmlFor="title">Title</label>
                        <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={data.title}
                        onChange={handleChange}/>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="tagLine">Tag Line</label>
                        <textarea
                        id="tagLine"
                        name="tagLine"
                        onChange={handleChange}
                        value={data.tagLine}
                        />
                    </div>
                    {
                        elementInfo ? (
                            <button type="submit" className="submitButton">Update</button>
                        ): (
                            <button type="submit" className="submitButton">Add</button>
                        )
                    }
                    <button type="butter" className="cancelButton" onClick={closePopup}>Cancel</button>
                </form>
            ): (
                <button className="openButton" onClick={() => setShowing(true)}>New Section</button>
            )
        }
        </>
    );
}

// === NewMenuItem ===
const NewMenuItem = ({ subMenuID, addNewMenu, submenuType, elementInfo, setEditingElement, itemsLength }) => {
    const [showing, setShowing] = useState(elementInfo ? true : false);
    const [data, setData] = useState({ 
        subMenuID: subMenuID, 
        menuItemID: elementInfo ? elementInfo.id : -1,
        title: elementInfo ? elementInfo.title : '', 
        description: elementInfo ? elementInfo.description : '' ,
        tagLine: elementInfo ? elementInfo.tagLine : '',
        order: elementInfo ? elementInfo.order : itemsLength
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const closePopup = (e) => {
        e.preventDefault();
        setShowing(false);
        if(elementInfo) {
            setEditingElement({ type: '', id: ''});
        }
    }
    const handleNewMenu = async (event) => {
        event.preventDefault();
        const response = await fetch('/.netlify/functions/menuitem-add', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to add menu');
        }
        const jsonData = await response.json();
        const wasNew = elementInfo ? false : true;
        setShowing(false);
        setData({
            subMenuID: subMenuID,
            menuItemID: -1,
            title: '',
            description: '',
            tagLine: '',
            order: itemsLength + 1
        });
        if(elementInfo) {
            setEditingElement({ type: '', id: ''});
        }
        addNewMenu(jsonData, wasNew);
    }
    return (
        <>
        {
            showing ? (
                <form className={`${"menuForm"} ${elementInfo ? "updateForm": ""}`} onSubmit={handleNewMenu}>
                    {
                        elementInfo ? null: (
                            <p>Add a new item under the <span className="typeSpan">"{submenuType}"</span> section</p>
                        )
                    }
                    <div className="inputContainer">
                        <label htmlFor="title">Title</label>
                        <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={data.title}
                        onChange={handleChange}/>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="description">Description</label>
                        <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="tagLine">Tag Line</label>
                        <textarea
                        id="tagLine"
                        name="tagLine"
                        value={data.tagLine}
                        onChange={handleChange}
                        />
                    </div>
                    {
                        elementInfo ? (
                            <button type="submit" className="submitButton">Update</button>
                        ): (
                            <button type="submit" className="submitButton">Add</button>
                        )
                    }
                    <button type="butter" className="cancelButton" onClick={closePopup}>Cancel</button>
                </form>
            ): (
                <button className="openButton" onClick={() => setShowing(true)}>New Item</button>
            )
        }
        </>
    );
}