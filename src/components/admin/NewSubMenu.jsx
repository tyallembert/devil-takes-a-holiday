import { useState } from 'react';
import "../../styles/AdminPage.scss";
import { addSubMenu, getMenu, updateSubMenu } from '../../utils/queries';

const NewSubMenu = ({ menuID, setMenu, menuType, elementInfo, setEditingElement, setActionFeedback }) => {
    const [showing, setShowing] = useState(elementInfo ? true : false);
    const [data, setData] = useState({ 
        menuId: menuID, 
        id: elementInfo ? elementInfo.id : -1,
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
        addSubMenu(data).then((success) => {
            if(success) {
                setActionFeedback({message: `${data.title} section successfully added!`, success: true, type: "add"});
            } else {
                setActionFeedback({message: `There was an error adding the ${data.title} section.`, success: false, type: "error"});
            }
            setShowing(false);
            setData({
                menuId: menuID,
                id: '',
                title: '',
                tagLine: ''
            });
            if(elementInfo) {
                setEditingElement({ type: '', id: ''});
            }
            getMenu().then((data) => {
                setMenu(data);
            });
        });
    }
    const handleUpdateMenu = async (event) => {
        event.preventDefault();
        updateSubMenu(data).then(() => {
            setShowing(false);
            setData({
                menuId: menuID,
                id: '',
                title: '',
                tagLine: ''
            });
            if(elementInfo) {
                setEditingElement({ type: '', id: ''});
            }
            getMenu().then((data) => {
                setMenu(data);
            });
        });
    }
    return (
        <>
        {
            showing ? (
                <form className={`${"menuForm"} ${elementInfo ? "updateForm": ""}`} onSubmit={elementInfo ? handleUpdateMenu: handleNewMenu}>
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

export default NewSubMenu;