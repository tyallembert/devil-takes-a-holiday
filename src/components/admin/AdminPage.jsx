import { useState, useEffect } from "react";
import "../../styles/AdminPage.scss";
import { MdEdit } from "react-icons/md";
import Login from "./Login";
import SubMenu from "./SubMenu";
import NewMenu from "./NewMenu";
import NewSubMenu from "./NewSubMenu";
import { deleteMenu, getMenu } from "../../utils/queries";
import { supabase } from "../../utils/supabase";
import DeleteConfirm from "./DeleteConfirm";
import AdminNav from "./AdminNav";


const AdminPage = () => {
    const [menu, setMenu] = useState([]);
    const [showingDeletePopup, setShowingDeletePopup] = useState(null);
    const [deleteElement, setDeleteElement] = useState({type: '', id: ''});
    const [editingElement, setEditingElement] = useState({type: '', id: ''});
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])

    useState(() => {
        getMenu().then((data) => {
            setMenu(data);
        });
    }, [session]);
    
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

    // function that handles deleting a menu
    const handleDeleteMenu = async (menuID) => {
        if(!showingDeletePopup) {
            setShowingDeletePopup(true);
            setDeleteElement({type: 'menu', id: menuID});
        }else {
            deleteMenu(menuID).then(() => {
                getMenu().then((data) => {
                    setMenu(data);
                    setShowingDeletePopup(false);
                });
            })
        }
    }

    if(!session) {
        return <Login/>
    } else{
        return (
            <div className="adminContainer">
                <DeleteConfirm 
                deleteID={deleteElement.id} 
                deleteType={deleteElement.type} 
                deleteFunction={handleDeleteMenu} 
                showing={showingDeletePopup} 
                setShowing={setShowingDeletePopup}/>

                <div className="mainHeader">
                    <h2>Admin</h2>
                    <a href="https://youtu.be/eetOtJTIDTM" target="_blank" rel="noreferrer" className="tutorialLink">Tutorial</a>
                </div>
                <AdminNav menu={menu}/>
                <div className="menusContainer">
                    <NewMenu setMenu={setMenu} addNewMenu={addNewMenu}/>
                    {
                        menu.map((singleMenu, i) => {
                            return (
                                <div key={i} className="menuContainer" id={singleMenu.title.split(" ")[0]}>
                                    {
                                        editingElement.type === 'menu' && editingElement.id === singleMenu.id ? (
                                            <NewMenu 
                                            setMenu={setMenu}
                                            addNewMenu={addNewMenu} 
                                            elementInfo={singleMenu}
                                            setEditingElement={setEditingElement}/>
                                        ): (
                                        <div className="header">
                                            <h1>{singleMenu.title}</h1>
                                            <button className="editButton" onClick={() => setEditingElement({ type: "menu", id: singleMenu.id})}><MdEdit/></button>
                                            <button className="removeButton" onClick={() => handleDeleteMenu(singleMenu.id)}>X</button>
                                        </div>
                                        )
                                    }
                                    <NewSubMenu 
                                    setMenu={setMenu}
                                    menuID={singleMenu.id}
                                    menuType={singleMenu.title}/>
                                    <div className="subMenuContainer">
                                        {
                                            singleMenu.subMenu.map((subMenu, j) => {
                                                return (
                                                    <SubMenu 
                                                    key={subMenu.id}
                                                    menu={menu}
                                                    singleMenu={singleMenu}
                                                    setMenu={setMenu}
                                                    subMenu={subMenu} 
                                                    editingElement={editingElement} 
                                                    setEditingElement={setEditingElement}
                                                    addNewMenu={addNewMenu}/>
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
    }
}

export default AdminPage;
