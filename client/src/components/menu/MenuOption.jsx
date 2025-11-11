import { Link } from "react-router-dom";


function MenuOption({title,url, iconUrl, isActive, changeOption}){  
    return(
        <Link to={`/${url}`} className={"w-fit lg:w-full h-15 flex gap-5 px-5 py-2 justify-start items-center text-white rounded-xl hover:bg-emerald-700 hover:cursor-pointer transition " + (isActive ? "bg-emerald-400 hover:bg-emerald-400" : "")}>
            <img src={iconUrl} alt={title} className="size-7 filter invert" />
            <h3 className={"text-lg text-center hidden lg:block"}>{title}</h3>
        </Link>
    );

}

export default MenuOption;