import { useEffect, useState } from "react";
import "../../styles/AdminNav.scss";

const MenuQuickNav = ({menu}) => {
    const [activeNavItem, setActiveNavItem] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const navElements = document.querySelectorAll('.adminNavElement');

            navElements.forEach(navElement => {
                const sectionId = navElement.getAttribute('href').substring(7); // Remove "/admin#" from the href
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveNavItem(sectionId);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="adminNavContainer">
            {
                menu.map((singleMenu) => {
                    return (
                        <div key={singleMenu.id} className="menuNavContainer">
                            <a href={`/admin#${singleMenu.title.split(" ")[0]}`} 
                            className={`adminNavElement parentNav ${activeNavItem === singleMenu.title.split(" ")[0] ? 'active' : ''}`}>
                                {singleMenu.title}
                            </a>
                            <div className="adminSubContainer">
                            {
                                singleMenu.subMenu.map((subMenu) => {
                                    return (
                                        <a key={subMenu.id} 
                                        href={`/admin#${subMenu.title.split(" ")[0]}`} 
                                        className={`adminNavElement childNav ${activeNavItem === subMenu.title.split(" ")[0] ? 'active' : ''}`}>
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

export default MenuQuickNav;