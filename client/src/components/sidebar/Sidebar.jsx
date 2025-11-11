import { useState } from "react";
import {DashboardIcon, CalendarIcon, MealIcon, AnalysisIcon, SettingsIcon } from "../../assets/icons";
import MenuOption from "../menu/MenuOption";

const menuItems = [
    {title: "Ekran główny", url: "", iconUrl: DashboardIcon},
    {title: "Kalendarz", url: "calendar", iconUrl: CalendarIcon},
    {title: "Żywienie", url: "nutrition", iconUrl: MealIcon},
    {title: "Statystyki", url: "statistics", iconUrl: AnalysisIcon},
    {title: "Ustawienia", url: "settings", iconUrl: SettingsIcon},
];

function Sidebar(){

    const [selectedOption, setSelectedOption] = useState(0);

    const changeOption = index=>{
        setSelectedOption(s => s = index)
    }

    return(
        <>
            <nav className="w-fit lg:w-xs lg:max-w-1/4 flex flex-col gap-5 min-h-screen p-2 bg-gray-800">
                {menuItems.map((item, index) => (
                    <MenuOption key={index} title={item.title} url={item.url} iconUrl={item.iconUrl} isActive={selectedOption === index} onClick={() => changeOption(index)}/>
                ))}
            </nav>
        </>
    );
}

export default Sidebar