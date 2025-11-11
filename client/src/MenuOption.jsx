
function MenuOption({iconUrl, title, isActive, onClick}){  


    return(
        <div className={"h-15 flex gap-5 p-2 justify-start items-center text-white rounded-sm hover:bg-blue-400 hover:cursor-pointer " + (isActive ? "bg-blue-500 hover:bg-blue-500" : "")} onClick={() => onClick()}>
            <img src={iconUrl} alt={title} className="size-7 filter invert" />
            <h3 className="text-lg text-center">{title}</h3>
        </div>
    );

}

export default MenuOption;