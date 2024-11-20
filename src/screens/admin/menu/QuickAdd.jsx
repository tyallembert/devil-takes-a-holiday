import React, { useState } from 'react';
import { addMenuItem, getMenu } from '../../../utils/queries';
import "../../../styles/QuickAdd.scss";

const QuickAdd = ({setMenu, submenus}) => {
    const [showing, setShowing] = useState(false);
    const [rawText, setRawText] = useState('');
    const [gptText, setGptText] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [animatePromptCopy, setAnimatePromptCopy] = useState(false);

    // Handle copying the ChatGPT prompt to the clipboard
    const handleCopy = () => {
        const promptText = "Please format the following menu items into the format: [{title: 'example title', description: 'example description', tagLine: 'example tag line'}...]. The tagline should not include the price, if the item contains a tagline it is typically the last sentence. Do not write any narrative, only the json response:";
        const formattedText = `${promptText}\n\n${rawText}`;
        navigator.clipboard.writeText(formattedText)
            .then(() => console.log("Text copied to clipboard!"))
            .catch((err) => alert("Failed to copy text: ", err));
        setAnimatePromptCopy(true);
        setTimeout(() => {
            setAnimatePromptCopy(false);
        }, 1000)
    };
    // Handle parsing the JSON formatted array from ChatGPT response
    const handleParseJson = () => {
        try {
            const parsedItems = JSON.parse(gptText);
            setMenuItems(parsedItems);
        } catch (error) {
            alert("Invalid JSON format. Please check the ChatGPT response.");
        }
    };

    // API call to add item to the menu
    const addItemToMenu = (item) => {
        const submenu = submenus.find(sub => {return sub.id === parseInt(activeSubmenu,10)});
        const numberMenuItems = submenu ? submenu.numberMenuItems : 0;
        const finalItem = {
            subMenuId: parseInt(activeSubmenu),
            id: -1,
            title: item.title,
            description: item.description,
            tagLine: item.tagLine,
            order: numberMenuItems + 1
        }
        console.log(finalItem)
        addMenuItem(finalItem).then((success) => {
            if(success) {
                console.log("Successfully added drink");
                setMenuItems((prevMenuItems) => prevMenuItems.filter((menuItem) => menuItem !== item));
                getMenu().then((data) => {
                    setMenu(data);
                });
            } else {
                console.log("Error saving menu item")
            }
        })
        
    };

    if (showing) {
        return (
            <div className='quickAddContainer'>
                <div className='titleContainer'>
                    <h2>Quick Add Menu Items</h2>
                    <p>This can be used to quickly add items to the menu. Follow the steps below.</p>
                </div>

                <div className='inputContainer' onSubmit={(e) => e.preventDefault()}>
                    <label className='label'>Paste raw menu items below(from menu PDF):</label>
                    <textarea
                        className='text'
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                    ></textarea>
                    <p>Click the button below to copy the ChatGPT prompt.</p>
                    <button type='button' className={`button copyButton ${animatePromptCopy ? "animateCopy": ""}`} onClick={handleCopy}>
                        Copy with Prompt
                    </button>
                </div>

                <div className='gptContainer'>
                    <p>Once you have copied the prompt, click the button below to open ChatGPT.</p>
                    <p>Once you have opened ChatGPT, paste into the prompt box and click generate. Once the response has been created, copy it.</p>
                    <a className='button chatGPTButton' rel="noreferrer" href="https://chatgpt.com/?temporary-chat=true" target='_blank'>Chat GPT</a>
                </div>

                <div className='inputContainer'>
                    <label className='label'>Paste ChatGPT response below:</label>
                    <textarea
                        className='text'
                        value={gptText}
                        onChange={(e) => setGptText(e.target.value)}
                    ></textarea>
                    <button className='button parseButton' onClick={handleParseJson}>
                        Parse Menu
                    </button>
                </div>

                {menuItems.length > 0 && (
                    <div className='itemsList'>
                        <h3 className='title'>Parsed Menu Items</h3>
                        <p>These items are NOT yet on the menu. Select which section they should go under then click "add":</p>
                        <div className='subitemContainer'>
                            <select className='submenuSelect' name='subMenuId' onChange={(e) => setActiveSubmenu(e.target.value)}>
                                <option value={""}>Select a submenu</option>
                            {
                                submenus.map((submenu) => (
                                    <option key={submenu.id} value={submenu.id}>{submenu.title}</option>
                                ))
                            }
                            </select>
                        </div>
                        {menuItems.map((item, index) => (
                            <div key={index} className='quickMenuItem'>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p><em>{item.tagLine}</em></p>
                                <button className='button addButton' onClick={() => addItemToMenu(item)} disabled={activeSubmenu?false:true}>Add to Menu</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <button className='button quickAddButton' onClick={() => setShowing(true)}>
                Quick Add
            </button>
        );
    }
};

export default QuickAdd;
