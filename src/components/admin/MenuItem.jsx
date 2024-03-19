import NewMenuItem from "./NewMenuItem";
import "../../styles/AdminPage.scss";
import { MdEdit } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { deleteMenuItem, getMenu, updateMenuItemOrder } from "../../utils/queries";

const MenuItem = ({singleMenu, subMenu, menuItem, setMenu, editingElement, setEditingElement}) => {

    const handleDelete = async (menuItemID) => {
        await deleteMenuItem(menuItemID).then(() => {
            getMenu().then((data) => {
                setMenu(data);
            });
        });
    }
    const menuItemOrderUp = async(menuItem) => {
        if(menuItem.order === 1) return;
        const adjacentMenuItem = subMenu.menuItem.find(item => item.order === menuItem.order - 1);
        if (adjacentMenuItem) {
            await updateMenuItemOrder(menuItem.order - 1, menuItem.id, adjacentMenuItem.order + 1, adjacentMenuItem.id);
            await getMenu().then((data) => {
                setMenu(data);
            });
        }
    }
    const menuItemOrderDown = async(menuItem) => {
        if(menuItem.order === subMenu.menuItem.length) return;
        const adjacentMenuItem = subMenu.menuItem.find(item => item.order === menuItem.order + 1);
        if (menuItem && adjacentMenuItem) {
            await updateMenuItemOrder(menuItem.order + 1, menuItem.id, adjacentMenuItem.order - 1, adjacentMenuItem.id);
            await getMenu().then((data) => {
                setMenu(data);
            });
        }
    }
    return (
        <div className="menuItem">
            {
                editingElement.type === 'menuItem' && editingElement.id === menuItem.id ? (
                    <NewMenuItem
                    subMenu={subMenu} 
                    setMenu={setMenu}
                    elementInfo={menuItem}
                    setEditingElement={setEditingElement}/>
                ): (
                    <>
                    <h3>{menuItem.title}</h3>
                    <p>{menuItem.description}</p>
                    <p className="tagLine">{menuItem.tagLine}</p>
                    {/* <p>{menuItem.order}</p> */}
                    <div className="arrowsContainer">
                        <button className="leftButton" onClick={() => menuItemOrderUp(menuItem)}><IoIosArrowBack/></button>
                        <button className="rightButton" onClick={() => menuItemOrderDown(menuItem)}><IoIosArrowForward/></button>
                    </div>
                    <div className="buttonsContainer">
                        <button className="editButton" onClick={() => setEditingElement({type: "menuItem", id: menuItem.id})}><MdEdit/></button>
                        <button className="removeButton" onClick={() => handleDelete(menuItem.id)}>X</button>
                    </div>
                    </>
                )
            }
        </div>
    )
}

export default MenuItem;
