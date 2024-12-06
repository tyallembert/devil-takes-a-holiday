import React, { useState } from 'react';
import { addArtist, addMenuItem, getMenu } from '../../../utils/queries';
import "../../../styles/QuickAdd.scss";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader } from 'lucide-react';
import { FaArrowUpRightFromSquare, FaInstagram, FaRegEnvelope } from 'react-icons/fa6';

const QuickAdd = ({type="menu", setter, submenus}) => {
    const [showing, setShowing] = useState(false);
    const [rawText, setRawText] = useState('');
    const [gptText, setGptText] = useState('');
    const [items, setItems] = useState([]);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [animatePromptCopy, setAnimatePromptCopy] = useState(false);
    const [geminiEmpty, setGeminiEmpty] = useState(false);
    const [geminiLoading, setGeminiLoading] = useState(false);

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

    const testGenerative = async() => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const promptText = type === "menu" ? `Please format the following menu items into the format: 
                                            [
                                                {
                                                    "title": "example title", 
                                                    "description": "example description", 
                                                    "tagLine": "example tag line"
                                                }...]. 
                                                The tagline should not include the price, if the item contains a tagline it is typically the last sentence. Make sure to properly indent the json. Do not write any narrative or other characters, only the json response:`
                                        : `Please format the following artists items into the format: 
                                            {
                                                "firstName": "",
                                                "middleName": "",
                                                "lastName": "",
                                                "pronouns": "",
                                                "title": "",
                                                "email": "",
                                                "instagramHandle": "",
                                                "instagramURL": "",
                                                "websiteURL": ""
                                            }. 
                                            Some of the fields may be left blank, but still include them in each item.
                                            Do not include @ symbols at the beginning of any of the words.
                                            Do not write any narrative, only the json response:`
            const formattedText = `${promptText}\n\n${rawText}`;
            
            setGeminiLoading(true);
            const generationConfig = {
                temperature: 1,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            };
            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [
                        {text: type === "menu" ? 
                            "Please format the following menu items into the format: \n[\n{\"title\": \"example title\", \n\"description\": \"example description\", \n\"tagLine\": \"example tag line\"\n}...]\nThe tagline should not include the price, if the item contains a tagline it is typically the last sentence. Make sure to properly indent the json. Do not write any narrative or other characters, only the json response:\nA Gift Certificate to OnlyFans, 16 \nFlor de Cana 7yr Rum, Mad River Vanilla Rum, passionfruit, lemon, coconut, vanilla syrup, ‘Billy’s hot pepper juice’, Lambrusco float. It sounds outlandish, but hey, it pays the bills…\n\n\nNotorious F.I.G., 15 Fig-infused cognac, Grand Marnier, house grenadine, lemon\nShe’s Made of Oak, 16 \nRittenhouse Rye, Underberg, Bigallet China-China, chipotle maple, Angostura bitters, oak smoke \n\nNew Calendar, 15 \nJalapeno infused Banhez Mezcal, Dolin Genepy, ginger, lime, citrus salt\n\nBitterly Beloved, 15 \nReposado tequila, Devil-made grapefruit cinnamon syrup, Campari, lime, saline, egg white. Bitterly beloved we are gathered here tonight to revel in the frothy pink goodness that is this drink.\n\nSaint Paul’s Bones, 15 (on draft!)\nRye whiskey, aged rum, Cynar, Luxardo Maraschino liqueur, clove, Maldon sea salt, orange zest\n\nAbanoble Snowman, 14 \nEl Silencio Mezcal, Amaro Abano, Amontillado, ginger, honey, lemon, cinnamon\n\n\nNo Rest For The Wicked, 15 (on draft!),  \nMezcal, Contratto Bitter, Perc coffee liqueur, Sweet Vermouth, Devil-made crème de cacao, mole bitters\nUnderberg, 5 \nBitter German herbal digestif\n":
                            "Please format the following artists items into the format: \n{\n\"firstName\": \"\",\n\"middleName\": \"\",\n\"lastName\": \"\",\n\"pronouns\": \"\",\n\"title\": \"\",\n\"email\": \"\",\n\"instagramHandle\": \"\",\n\"instagramURL\": \"\",\n\"websiteURL\": \"\"\n }. \n Some of the fields may be left blank, but still include them in each item.\n Do not include @ symbols at the beginning of any of the words.\n Do not write any narrative, only the json response:"
                        },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {text: type === "menu" ? 
                            "```json\n[\n  {\n    \"title\": \"A Gift Certificate to OnlyFans\",\n    \"description\": \"Flor de Cana 7yr Rum, Mad River Vanilla Rum, passionfruit, lemon, coconut, vanilla syrup, ‘Billy’s hot pepper juice’, Lambrusco float.\",\n    \"tagLine\": \"It sounds outlandish, but hey, it pays the bills…\"\n  },\n  {\n    \"title\": \"Notorious F.I.G.\",\n    \"description\": \"Fig-infused cognac, Grand Marnier, house grenadine, lemon\",\n    \"tagLine\": \"\"\n  },\n  {\n    \"title\": \"She’s Made of Oak\",\n    \"description\": \"Rittenhouse Rye, Underberg, Bigallet China-China, chipotle maple, Angostura bitters, oak smoke\",\n    \"tagLine\": \"\"\n  },\n  {\n    \"title\": \"New Calendar\",\n    \"description\": \"Jalapeno infused Banhez Mezcal, Dolin Genepy, ginger, lime, citrus salt\",\n    \"tagLine\": \"\"\n  },\n  {\n    \"title\": \"Bitterly Beloved\",\n    \"description\": \"Reposado tequila, Devil-made grapefruit cinnamon syrup, Campari, lime, saline, egg white.\",\n    \"tagLine\": \"Bitterly beloved we are gathered here tonight to revel in the frothy pink goodness that is this drink.\"\n  },\n  {\n    \"title\": \"Saint Paul’s Bones\",\n    \"description\": \"Rye whiskey, aged rum, Cynar, Luxardo Maraschino liqueur, clove, Maldon sea salt, orange zest\",\n    \"tagLine\": \"\"\n  },\n  {\n    \"title\": \"Abanoble Snowman\",\n    \"description\": \"El Silencio Mezcal, Amaro Abano, Amontillado, ginger, honey, lemon, cinnamon\",\n    \"tagLine\": \"\"\n  },\n  {\n    \"title\": \"No Rest For The Wicked\",\n    \"description\": \"Mezcal, Contratto Bitter, Perc coffee liqueur, Sweet Vermouth, Devil-made crème de cacao, mole bitters\",\n    \"tagLine\": \"\"\n  },\n  {\n    \"title\": \"Underberg\",\n    \"description\": \"Bitter German herbal digestif\",\n    \"tagLine\": \"\"\n  }\n]\n```\n":
                            "```json\n[\n  {\n    \"firstName\": \"Jane\",\n    \"middleName\": \"\",\n    \"lastName\": \"Doe\",\n    \"pronouns\": \"she/her\",\n    \"title\": \"Visual Artist\",\n    \"email\": \"jane.doe@email.com\",\n    \"instagramHandle\": \"janedoeart\",\n    \"instagramURL\": \"https://www.instagram.com/janedoeart\",\n    \"websiteURL\": \"https://www.janedoe.com\"\n  },\n  {\n    \"firstName\": \"John\",\n    \"middleName\": \"Peter\",\n    \"lastName\": \"Smith\",\n    \"pronouns\": \"he/him\",\n    \"title\": \"Sculptor\",\n    \"email\": \"john.smith@email.com\",\n    \"instagramHandle\": \"\",\n    \"instagramURL\": \"\",\n    \"websiteURL\": \"https://www.johnsmithsculptures.com\"\n  },\n  {\n    \"firstName\": \"Maria\",\n    \"middleName\": \"\",\n    \"lastName\": \"Garcia\",\n    \"pronouns\": \"she/her\",\n    \"title\": \"Photographer\",\n    \"email\": \"\",\n    \"instagramHandle\": \"mariagarcia_photo\",\n    \"instagramURL\": \"https://www.instagram.com/mariagarcia_photo\",\n    \"websiteURL\": \"\"\n  },\n  {\n    \"firstName\": \"David\",\n    \"middleName\": \"Lee\",\n    \"lastName\": \"Brown\",\n    \"pronouns\": \"he/him\",\n    \"title\": \"Painter\",\n    \"email\": \"david.brown@email.com\",\n    \"instagramHandle\": \"davidleebrownart\",\n    \"instagramURL\": \"https://www.instagram.com/davidleebrownart\",\n    \"websiteURL\": \"\"\n  }\n]\n```\n"
                            },
                        ],
                    },
                ],
            });
            
            const result = await chatSession.sendMessage(formattedText);
            let text = result.response.text();
            setGeminiLoading(false);

            // Remove backticks from the generated text
            const jsonText = text.match(/\[.*\]/s)?.[0];
            const json = JSON.parse(jsonText); // Parse the text into JSON
            setItems(json); // Set the parsed JSON to your function
        } catch (error) {
            setGeminiEmpty(true);
            setGeminiLoading(false);
            console.error("Error generating or parsing JSON:", error);
        }
    }
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
            setItems(parsedItems);
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
                setItems((prevMenuItems) => prevMenuItems.filter((singleItem) => singleItem !== item));
                getMenu().then((data) => {
                    setter(data);
                });
            } else {
                console.log("Error saving menu item")
            }
        })
        
    };
    // API call to add artist to artists
    const addArtistToList = (newArtist) => {
        console.log(newArtist)
        addArtist(newArtist).then(() => {
            console.log("Artist Added");
            setItems((prevArtists) => prevArtists.filter((artist) => artist !== newArtist));
            setter((prevArtists) => [...prevArtists, newArtist])
        });
        
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
                    {
                        geminiEmpty ? (
                            <>
                            <p>Click the button below to copy the ChatGPT prompt.</p>
                            <button type='button' className={`button copyButton ${animatePromptCopy ? "animateCopy": ""}`} onClick={handleCopy}>
                            Copy with Prompt
                            </button>
                            </>
                        ): (
                            <>
                            <button className="button aiButton" onClick={testGenerative}>
                                {geminiLoading ? <Loader className='loading'/>: "Generate with AI"}
                            </button>
                            </>
                        )
                    }
                </div>
                {
                    geminiEmpty ? (
                    <>
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
                    </>
                    ): null
                }

                {items.length > 0 && (
                    <div className='itemsList'>
                        <h3 className='title'>Parsed Items</h3>
                        {
                            type === "menu" ? (
                                <>
                                <p>These items are NOT yet on the menu. Select which section they should go under then click "add":</p>
                                <p>Sometimes AI makes mistakes! If you notice something wrong, you can add it to the menu then edit it once it is added</p>
                                <div className='subitemContainer'>
                                    <select className='submenuSelect' name='subMenuId' onChange={(e) => setActiveSubmenu(e.target.value)}>
                                        <option value={""}>Select a submenu</option>
                                    {
                                        submenus ? (
                                            submenus.map((submenu) => (
                                                <option key={submenu.id} value={submenu.id}>{submenu.title}</option>
                                            ))
                                        ): null
                                    }
                                    </select>
                                </div>
                                </>
                            ): <p>Sometimes AI makes mistakes! If you notice something wrong, you can add the artist then edit it once it is added</p>
                        }
                        {items.map((item, index) => (
                            type === "menu" ?
                            <MiniMenu item={item} index={index} activeSubmenu={activeSubmenu} addItemToMenu={addItemToMenu} />
                            : <MiniArtist artist={item} addArtistToList={addArtistToList}/>
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

function MiniArtist({artist, addArtistToList}) {
  return (
    <div key={artist.id} className='quickMenuItem'>
        <div className='singleArtistHeader'>
            <h2 className='artistName'>{artist.firstName} {artist.middleName} {artist.lastName}</h2>
            {
                artist.pronouns && <p className='pronouns'>{artist.pronouns}</p>
            }
            {
                artist.title && <p className='title'>{artist.title}</p>
            }
        </div>
        {
            artist.instagramHandle && (
            <div className='contactContainer' href={artist.instagramURL ? artist.instagramURL: ''}>
                <FaInstagram className='contactIcon instagram'/>
                <p className='contactText'>@{artist.instagramHandle}</p>
            </div>
            )
        }
        {
            artist.email && (
            <div className='contactContainer' href={`mailto:${artist.email}`}>
                <FaRegEnvelope className='contactIcon envelope'/>
                <p className='contactText'>{artist.email}</p>
            </div>
            )
        }
        {
            artist.websiteURL && (
            <div className='contactContainer' href={artist.websiteURL} target='_blank' rel="noreferrer">
                <FaArrowUpRightFromSquare className='contactIcon website'/>
                <p className='contactText'>{artist.websiteURL}</p>
            </div>
            )
        }
        <button className='button addButton' onClick={() => addArtistToList(artist)}>Add Artist</button>
    </div>
  )
}

function MiniMenu({item, index, activeSubmenu, addItemToMenu}) {
    return (
      <div key={index} className='quickMenuItem'>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p><em>{item.tagLine}</em></p>
        <button className='button addButton' onClick={() => addItemToMenu(item)} disabled={activeSubmenu?false:true}>Add to Menu</button>
    </div>
    )
  }

