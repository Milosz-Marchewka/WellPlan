
function MenuOption({iconUrl, title, isActive, onClick}){  
    return(
        <div className={"w-fit lg:w-full h-15 flex gap-5 px-5 py-2 justify-start items-center text-white rounded-xl hover:bg-emerald-700 hover:cursor-pointer transition " + (isActive ? "bg-emerald-400 hover:bg-emerald-400" : "")} onClick={() => onClick()}>
            <img src={iconUrl} alt={title} className="size-7 filter invert" />
            <h3 className={"text-lg text-center hidden lg:block"}>{title}</h3>
        </div>
    );

}

export default MenuOption;