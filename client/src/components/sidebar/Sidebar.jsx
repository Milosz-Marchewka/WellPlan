import { useEffect, useState } from "react";
import {DashboardIcon, CalendarIcon, MealIcon, TreningIcon, SettingsIcon } from "../../assets/icons";
import MenuOption from "../menu/MenuOption";
import UserIcon from "../../assets/icons/sidebar/user.png"
import { Link } from "react-router-dom";

const menuItems = [
    {title: "Ekran główny", url: "", iconUrl: DashboardIcon},
    {title: "Kalendarz", url: "calendar", iconUrl: CalendarIcon},
    {title: "Żywienie", url: "nutrition", iconUrl: MealIcon},
    {title: "Trening", url: "trening", iconUrl: TreningIcon},
    {title: "Ustawienia", url: "settings", iconUrl: SettingsIcon},
];

const menuItemsMobile = [
    {title: "Ekran główny", url: "", iconUrl: DashboardIcon},
    {title: "Kalendarz", url: "calendar", iconUrl: CalendarIcon},
    {title: "Żywienie", url: "nutrition", iconUrl: MealIcon},
    {title: "Trening", url: "trening", iconUrl: TreningIcon},
];

// fixed left-0 top-0 w-fit lg:w-70 lg:max-w-1/4 flex flex-col gap-5 min-h-screen p-2 pt-5 bg-gray-800 ring-2 ring-gray-900

function Sidebar({user, selectedOption}){

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isProfileSelected, setIsProfileSelected] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <>
            {
                isMobile ?
                <nav className="fixed bottom-0 flex items-center justify-around h-fit w-screen p-2 bg-gray-800 ring-2 ring-gray-900 z-100 
                    md:top-0 md:w-fit md:flex-col md:gap-5 md:min-h-screen md:justify-start
                    lg:w-60">
                    {menuItemsMobile.map((item, index) => (
                        <MenuOption key={index} title={item.title} url={item.url} iconUrl={item.iconUrl} isActive={selectedOption === item.url}/>
                    ))
                    }
                    <div className={"relative w-fit lg:w-full h-15 flex gap-5 px-5 py-2 justify-start items-center text-white rounded-xl hover:bg-emerald-700 hover:cursor-pointer transition " + (isProfileSelected ? "bg-emerald-400 hover:bg-emerald-400" : "")} onClick={() => setIsProfileSelected(prev => !isProfileSelected)} onMouseOut={() => setIsProfileSelected(false)}>
                        <img src={UserIcon} alt="Profil" className="size-7" />
                        <h3 className={"text-lg text-center hidden lg:block "}>Profil</h3>
                        {
                            isProfileSelected ?
                            <div className="absolute w-50 p-2 bg-gray-800 left--20 top-[-160px] left-[-120px] flex flex-col justify-center rounded-xl ring-2 ring-gray-900">
                                <Link to={`/settings`} className={"w-full h-15 flex gap-5 mb-2 justify-start px-5 items-center text-white rounded-xl hover:bg-emerald-700 hover:cursor-pointer transition "}>
                                    <img src={SettingsIcon} alt="" className="size-7 filter invert" />
                                    <h3 className={"text-lg text-center block "}>Ustawienia</h3>
                                </Link>
                                <div className="border-t border-white mt-auto w-full pt-2">
                                    <h4 className="mt-auto text-red-300 text-xl hover:bg-gray-900 w-full text-center py-3 rounded-xl cursor-pointer transition">Wyloguj</h4>
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </nav>
                :
                <nav className="fixed bottom-0 flex items-center justify-around h-fit w-screen p-2 bg-gray-800 ring-2 ring-gray-900 z-100 
                    md:top-0 md:w-fit md:flex-col md:gap-5 md:min-h-screen md:justify-start
                    lg:w-60">
                    <div className="text-white text-center w-full border-b border-white pb-4 text-lg">
                        <img src={UserIcon} alt="" className="h-20 mx-auto"/>
                        <h4 className="w-full">{user.name} {user.surname}</h4>
                        <h6 className="text-gray-400 text-center italic text-sm">{user.email}</h6>
                    </div>
                    {menuItems.map((item, index) => (
                        <MenuOption key={index} title={item.title} url={item.url} iconUrl={item.iconUrl} isActive={selectedOption === item.url}/>
                    ))
                    }
                    <div className="border-t border-white mt-auto w-full pt-2">
                        <h4 className="mt-auto text-red-300 text-xl hover:bg-gray-900 w-full text-center py-3 rounded-xl cursor-pointer transition">Wyloguj</h4>
                    </div>
                </nav>
            }
        </>
    );
}

export default Sidebar