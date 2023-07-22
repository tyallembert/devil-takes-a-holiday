import "../styles/searchDrink.scss"
import {useState, useEffect} from "react";
import menuData from "../data/menu.json";
import DrinkObject from "./DrinkObject";
import SearchPNG from "../images/search.png";

const SearchDrink = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [menu, setMenu] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setMenu(menuData[0]);
    }, []);

    const handleInFocus = (event) => {
        setSearchActive(true);
        const results = searchItems(event.target.value);
        setSearchResults(results);
    };

    const handleBlur = (event) => {
        setSearchActive(false);
        setSearchResults([]);
    };

    const handleInputChange = (event) => {
        const results = searchItems(event.target.value);
        setSearchResults(results);
    };

    const searchItems = (searchTerm) => {
        searchTerm = searchTerm.toLowerCase().trim();
        const outputList = [];
        if(searchTerm.length === 0) return outputList;

        for (const key1 in menu){
            for (const key2 in menu[key1]) {
                const item = menu[key1][key2];
                const title = item.title.toLowerCase();
                const description = item.description.toLowerCase();
            
                if (title.includes(searchTerm)) {
                    outputList.push(item);
                }
                else if(description.includes(searchTerm)){
                    outputList.push(item);
                }
              }
        }
        outputList.sort((a, b) => a.title.localeCompare(b.title));
      
        return outputList;
      };

    return (
        <div className="searchDrinkContainer">
            <label className="searchLabel">
                <input type="text" 
                className="searchDrinkInput" 
                placeholder="Search for a drink"
                onFocus={handleInFocus}
                onBlur={handleBlur}
                onChange={handleInputChange} />
                <img src={SearchPNG} alt="Search" className="searchIcon" />
            </label>
            <div className={`outputContainer ${searchActive ? "": "hidden"}`}>
            {
                searchResults.length === 0 ? (
                    <div className="noResultsContainer">
                        <h2 className="noResults">No results found</h2>
                    </div>) :
                searchResults.map((result, index) => (
                    <DrinkObject key={index} index={index}
                    title={result.title}
                    description={result.description}
                    price={result.price} />
                ))
            }
            </div>
        </div>
    )
}

export default SearchDrink;