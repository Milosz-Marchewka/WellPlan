
function StyledButton({id, type, text, click, classTw}){
    let baseClasses = "bg-emerald-400 px-8 py-1 text-lg rounded-lg cursor-pointer transition shadow-black hover:bg-emerald-300 hover:shadow-xs";
    return(
        <button id={id} type={type} className={baseClasses + classTw} onClick={click} >{text}</button>
    );
}

export default StyledButton;