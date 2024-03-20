import { useState } from "react";
import { MdEdit } from "react-icons/md";
import "../../styles/AdminPage.scss";
import NewSubMenu from "./NewSubMenu";
import NewMenuItem from "./NewMenuItem";
import { deleteSubMenu, getMenu } from "../../utils/queries";
import MenuItem from "./MenuItem";
import DeleteConfirm from "./DeleteConfirm";

const SubMenu = ({setMenu, subMenu, editingElement, setEditingElement, singleMenu, setActionFeedback}) => {
    const [showingDeletePopup, setShowingDeletePopup] = useState(null);
    const [deleteElement, setDeleteElement] = useState({type: '', id: ''});
    const handleDeleteSubMenu = async (subMenuID) => {
        if(!showingDeletePopup) {
            setShowingDeletePopup(true);
            setDeleteElement({type: 'subMenu', id: subMenuID});
        } else {
            await deleteSubMenu(subMenuID).then(() => {
                getMenu().then((data) => {
                    setMenu(data);
                });
            })
            setShowingDeletePopup(false);
        }
    }
    return (
        <div className="subMenu" id={subMenu.title.split(" ")[0]}>
            <DeleteConfirm
            deleteID={deleteElement.id} 
            deleteType={deleteElement.type} 
            deleteFunction={handleDeleteSubMenu} 
            showing={showingDeletePopup} 
            setShowing={setShowingDeletePopup}/>
        {
            editingElement.type === 'subMenu' && editingElement.id === subMenu.id ? (
                <NewSubMenu
                setMenu={setMenu}
                menuID={singleMenu.id}
                menuType={singleMenu.title} 
                elementInfo={subMenu}
                setEditingElement={setEditingElement}
                setActionFeedback={setActionFeedback}/>
            ): (
                <>
                <div className="header">
                    <h2>{subMenu.title}</h2>
                    <button className="editButton" onClick={() => setEditingElement({ type: "subMenu", id: subMenu.id})}><MdEdit/></button>
                    <button className="removeButton" onClick={() => handleDeleteSubMenu(subMenu.id)}>X</button>
                </div>
                <p>{subMenu.tagLine}</p>
                </>
            )
        }
        <NewMenuItem 
        subMenu={subMenu} 
        setMenu={setMenu}
        submenuType={subMenu.title}
        setActionFeedback={setActionFeedback}/>
        <div className="menuItemContainer">
            {
                subMenu.menuItem.map((menuItem, k) => {
                    return (
                        <MenuItem 
                        key={k}
                        singleMenu={singleMenu}
                        subMenu={subMenu}
                        setMenu={setMenu}
                        menuItem={menuItem}
                        editingElement={editingElement}
                        setEditingElement={setEditingElement}
                        setActionFeedback={setActionFeedback}/>
                    );
                })
            }
        </div>
    </div>
    )
}

export default SubMenu;