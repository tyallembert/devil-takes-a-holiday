import React, { useState } from 'react';
import { addArtist } from '../../../utils/queries';
import "../../../styles/QuickAdd.scss";
import "../../../styles/AdminArtists.scss";
import { FaArrowUpRightFromSquare, FaInstagram, FaRegEnvelope } from 'react-icons/fa6';

const QuickAddArtists = ({setArtists}) => {
    const [showing, setShowing] = useState(false);
    const [rawText, setRawText] = useState('');
    const [gptText, setGptText] = useState('');
    const [artists, setNewArtists] = useState([]);
    const [animatePromptCopy, setAnimatePromptCopy] = useState(false);

    // Handle copying the ChatGPT prompt to the clipboard
    const handleCopy = () => {
        const promptText = `Please format the following artists items into the format: 
        {
            firstName: '',
            middleName: '',
            lastName: '',
            pronouns: '',
            title: '',
            email: '',
            instagramHandle: '',
            instagramURL: '',
            websiteURL: ''
        }. 
        Some of the fields may be left blank, but still include them in each item.
        Do not include @ symbols at the beginning of any of the words.
        Do not write any narrative, only the json response:`;

        const formattedText = `${promptText}\n\n${rawText}`;
        navigator.clipboard.writeText(formattedText)
            .then(() => console.log("Text copied to clipboard!"))
            .catch((error) => alert("Failed to copy text: "+error));
        setAnimatePromptCopy(true);
        setTimeout(() => {
            setAnimatePromptCopy(false);
        }, 1000)
    };
    // Handle parsing the JSON formatted array from ChatGPT response
    const handleParseJson = () => {
        try {
            const parsedItems = JSON.parse(gptText);
            setNewArtists(parsedItems);
        } catch (error) {
            alert("Invalid JSON format. Please check the ChatGPT response.");
        }
    };

    // API call to add item to the menu
    const addArtistToList = (newArtist) => {
        console.log(newArtist)
        addArtist(newArtist).then(() => {
            console.log("Artist Added");
            setNewArtists((prevArtists) => prevArtists.filter((artist) => artist !== newArtist));
            setArtists((prevArtists) => [...prevArtists, newArtist])
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
                    <p>Click the button below to copy the ChatGPT prompt</p>
                    <button type='button' className={`button copyButton ${animatePromptCopy ? "animateCopy": ""}`} onClick={handleCopy}>
                        Copy with Prompt
                    </button>
                </div>

                <div className='gptContainer'>
                    <p>Once you have copied the prompt, click the button below to open ChatGPT</p>
                    <p>Once you have opened ChatGPT, paste into the prompt box and click generate. Once the response has been created, copy it</p>
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

                {artists.length > 0 && (
                    <div className='itemsList'>
                        <h3 className='title'>Parsed Menu Items</h3>
                        <p>These items are NOT yet on the menu. Select which section they should go under then click "add":</p>
                        {artists.map((artist, index) => (
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

export default QuickAddArtists;
