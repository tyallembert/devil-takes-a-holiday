import "../../styles/AdminNav.scss";

const AdminNav = ({menu}) => {
    return (
        <div className="adminNavContainer">
            {
                menu.map((singleMenu) => {
                    return (
                        <div key={singleMenu.id} className="menuNavContainer">
                            <a href={`/admin#${singleMenu.title.split(" ")[0]}`} 
                            className="adminNavElement parentNav">
                                {singleMenu.title}
                            </a>
                            <div className="adminSubContainer">
                            {
                                singleMenu.subMenu.map((subMenu) => {
                                    return (
                                        <a key={subMenu.id} 
                                        href={`/admin#${subMenu.title.split(" ")[0]}`} 
                                        className="adminNavElement childNav">
                                            {subMenu.title}
                                        </a>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AdminNav;