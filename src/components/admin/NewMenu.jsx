import { useState } from 'react';
import "../../styles/AdminPage.scss";
import { addMenu, getMenu, updateMenu } from '../../utils/queries';

const NewMenu = ({ setMenu, elementInfo, setEditingElement, setActionFeedback }) => {
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
        addMenu(data).then((success) => {
            if(success) {
                setActionFeedback({message: `${data.title} menu successfully added!`, success: true, type: "add"});
            } else {
                setActionFeedback({message: `There was an error adding the ${data.title} menu.`, success: false, type: "error"});
            }
            setShowing(false);
            setData({ title: '', id: ''});
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
        updateMenu(data).then(() => {
            setShowing(false);
            setData({ title: '', id: ''});
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

export default NewMenu;