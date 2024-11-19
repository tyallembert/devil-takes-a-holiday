import { useEffect, useState } from 'react';
import "../../../styles/AdminPage.scss";
import { addMenuItem, getMenu, updateMenuItem } from '../../../utils/queries';

const NewMenuItem = ({ setMenu, subMenu, elementInfo, setEditingElement, setActionFeedback }) => {
    const [showing, setShowing] = useState(elementInfo ? true : false);
    const [data, setData] = useState({ 
        subMenuId: subMenu.id, 
        id: elementInfo ? elementInfo.id : -1,
        title: elementInfo ? elementInfo.title : '', 
        description: elementInfo ? elementInfo.description : '' ,
        tagLine: elementInfo ? elementInfo.tagLine : '',
        order: elementInfo ? elementInfo.order : subMenu.menuItem.length + 1
    });
    useEffect(() => {
        if(elementInfo) return;
        setData(prevData => ({ ...prevData, order: subMenu.menuItem.length + 1 }));
    }, [subMenu.menuItem.length, elementInfo]);
    
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
    const handleNewMenuItem = async (event) => {
        event.preventDefault();
        addMenuItem(data).then((success) => {
            if(success) {
                setActionFeedback({message: `${data.title} item successfully added!`, success: true, type: "add"});
            } else {
                setActionFeedback({message: `There was an error adding the ${data.title} item.`, success: false, type: "error"});
            }
            setShowing(false);
            setData({
                subMenuId: subMenu.id,
                id: -1,
                title: '',
                description: '',
                tagLine: '',
                order: -1
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
        updateMenuItem(data).then((success) => {
            if(success) {
                setActionFeedback({message: `${data.title} item successfully updated!`, success: true, type: "update"});
            } else {
                setActionFeedback({message: `There was an error updated the ${data.title} item.`, success: false, type: "error"});
            }
            console.log("data: ", data);
            setShowing(false);
            setData({
                subMenuId: subMenu.id,
                id: -1,
                title: '',
                description: '',
                tagLine: '',
                order: -1
            });
            setEditingElement({ type: '', id: ''});
            getMenu().then((data) => {
                setMenu(data);
            });
        });
    }
    return (
        <>
        {
            showing ? (
                <form className={`${"menuForm"} ${elementInfo ? "updateForm": ""}`} onSubmit={elementInfo ? handleUpdateMenu: handleNewMenuItem}>
                    {
                        elementInfo ? null: (
                            <p>Add a new item under the <span className="typeSpan">"{subMenu.title}"</span> section</p>
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
                            <div className="inputContainer">
                                <label htmlFor="tagLine">Order</label>
                                <input 
                                type="text" 
                                id="order" 
                                name="order" 
                                value={data.order}
                                onChange={handleChange}/>
                            </div>
                        ):null
                    }
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

export default NewMenuItem;