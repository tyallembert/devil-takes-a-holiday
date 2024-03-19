import "../../styles/AdminPage.scss";

const DeleteConfirm = ({ deleteID, deleteType, deleteFunction, showing, setShowing}) => {

    const handleDelete = () => {
        deleteFunction(deleteID);
    }

    return (
        <div className={`${"deletePopup"} ${showing === true ? "showing": showing === false ? "hidden": ""}`}>
            <h2>Are you sure you want to delete an entire {deleteType}?</h2>
            <div className="buttonsContainer">
                <button className="yesButton" onClick={handleDelete}>Yes</button>
                <button className="noButton" onClick={() => setShowing(false)}>No</button>
            </div>
        </div>
    )
}

export default DeleteConfirm;