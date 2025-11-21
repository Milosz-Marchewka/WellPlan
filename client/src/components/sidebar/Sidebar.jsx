import {DashboardIcon, CalendarIcon, MealIcon, TreningIcon, SettingsIcon } from "../../assets/icons";
import MenuOption from "../menu/MenuOption";

const menuItems = [
    {title: "Ekran główny", url: "", iconUrl: DashboardIcon},
    {title: "Kalendarz", url: "calendar", iconUrl: CalendarIcon},
    {title: "Żywienie", url: "nutrition", iconUrl: MealIcon},
    {title: "Trening", url: "trening", iconUrl: TreningIcon},
    {title: "Ustawienia", url: "settings", iconUrl: SettingsIcon},
];

// fixed left-0 top-0 w-fit lg:w-70 lg:max-w-1/4 flex flex-col gap-5 min-h-screen p-2 pt-5 bg-gray-800 ring-2 ring-gray-900

function Sidebar({selectedOption}){

    return(
        <>
            <nav className="fixed bottom-0 flex items-center justify-around h-fit w-screen p-2 bg-gray-800 ring-2 ring-gray-900 z-100 
                md:top-0 md:w-fit md:flex-col md:gap-5 md:min-h-screen md:pt-5 md:justify-start
                lg:w-60">
                {menuItems.map((item, index) => (
                    <MenuOption key={index} title={item.title} url={item.url} iconUrl={item.iconUrl} isActive={selectedOption === item.url}/>
                ))}
            </nav>
        </>
    );
}

export default Sidebar