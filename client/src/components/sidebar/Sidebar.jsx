import MenuOption from "../menu/MenuOption";
import DashboardIcon from "./assets/icons/dashboard.png"
import CalendarIcon from "./assets/icons/calendar.png"
import MealIcon from "./assets/icons/meal.png"
import AnalysisIcon from "./assets/icons/analysis.png"
import SettingsIcon from "./assets/icons/settings.png"

function Sidebar({selectedOption, onSwitchOption}){
    const menuItems = [
        {title: "Ekran główny", iconUrl: DashboardIcon},
        {title: "Kalendarz", iconUrl: CalendarIcon},
        {title: "Żywienie", iconUrl: MealIcon},
        {title: "Statystyki", iconUrl: AnalysisIcon},
        {title: "Ustawienia", iconUrl: SettingsIcon},
    ];

    return(
        <>
            <nav className="w-fit lg:w-xs lg:max-w-1/4 flex flex-col gap-5 min-h-screen p-2 bg-gray-800">
                {menuItems.map((item, index) => (
                    <MenuOption key={index} title={item.title} iconUrl={item.iconUrl} isActive={selectedOption === index} onClick={() => onSwitchOption(index)}/>
                ))}
            </nav>
        </>
    );
}

export default Sidebar