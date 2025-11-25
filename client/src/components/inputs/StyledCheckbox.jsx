
function StyledCheckbox({id, label, onChange, classTw}){
    let baseClasses = "text-white flex align-middle gap-3";
    return(
        <div className={baseClasses + classTw}>
            <input id={id} type="checkbox" className="self-center hover:cursor-pointer size-4 mr-2" onChange={onChange}/>
            <label htmlFor={id} className="">{label}</label>
        </div>
    );
}

export default StyledCheckbox;