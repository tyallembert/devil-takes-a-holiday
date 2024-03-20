import { useEffect, useState } from "react";
import "../../styles/PopupMessage.scss";
import { MdPostAdd, MdErrorOutline } from "react-icons/md";

const PopupMessage = ({ message, success, type="add" }) => {
    const [showing, setShowing] = useState(true);
    useEffect(() => {
        if(message !== '' && message !== null) {
            setShowing(true);
            setTimeout(() => {
                setShowing(false);
            }, 3000);
        }
    }
    , [message]);
  return (
    <div className={`popupMessage 
    ${showing === true ? "showing": showing === false ? "hidden": ""}
    ${success === true ? "success": success === false ? "error": ""}`}>
        {
            type === "add" ? <MdPostAdd className="icon"/> : 
            type === "error" ?<MdErrorOutline className="icon"/> : null
        }
        <p>{message}</p>
    </div>
  );
}

export default PopupMessage;