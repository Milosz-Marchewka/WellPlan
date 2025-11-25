import { useEffect, useState } from "react";
import EyeShow from "../../assets/icons/eyes/eyeShow.png";
import EyeHidden from "../../assets/icons/eyes/eyeHidden.png";

const StyledInput = ({id, type="text", label, name, value, width = "w-full", mt = "mt-0", disabled = false, valid = true, onChange, errorText = ""})=>{
    let additionalClasses = "";

    const [isHidden, setIsHidden] = useState(true);
    const [isValid, setIsValid] = useState(valid);


    useEffect(() => {
        setIsValid(valid);
    }, [valid]);

    const handleClick = () =>{
        setIsHidden(prev => !prev);
    }

    const handleBlur = () => {
        if(value?.trim() == "" || value == null || value == undefined){
            setIsValid(false);
        }
    };

    const handleInputChange = (e) => {
        if(e.target.value?.trim() == "" || e.target.value == null || e.target.value == undefined){
            setIsValid(false);
        }else{
            setIsValid(true);
        }
        onChange(e)
    }

    if(disabled){
        additionalClasses += "opacity-60 font-italic italic";
    }

    return(
        type === "password" ?
        <div className={`relative ${width} ${mt} ${additionalClasses}`}>
            <input type={isHidden ? type : "text"} id={id} className={`bg-gray-600 peer text-white outline-none border ${isValid ? "border-white" : "border-red-500"} rounded-xl px-3 pt-5 pb-2 w-full focus:outline-none focus:border focus:border-emerald-400`} name={name} value={value ?? ""} placeholder=" " disabled={disabled}  onChange={(e)=>handleInputChange(e)}/>
            <label htmlFor={id} className={`absolute left-3 top-1 text-gray-200 text-sm transition-all peer-placeholder-shown:top-3.5 ${isValid ? "peer-placeholder-shown:text-gray-200" : "text-red-400"} peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-emerald-400 pointer-events-none`}>{label}</label>
            <span className={"absolute right-4 top-3.5 cursor-pointer"} onClick={handleClick}><img className="size-6" src={isHidden ? EyeHidden : EyeShow}/></span>
            {
                !isValid ?
                <p className="m-0 p-0 w-fit whitespace-nowrap absolute bottom-[-11px] left-2 bg-red-500 px-3 text-[11px] sm:text-[13px] z-500 rounded-lg">{errorText}</p>
                :
                <></>
            }
        </div>
        :
        <div className={`relative ${width} ${mt} ${additionalClasses}`}>
            <input type={type} id={id} className={`bg-gray-600 peer text-white outline-none border ${isValid ? "border-white" : "border-red-500"} rounded-xl px-3 pt-5 pb-2 w-full focus:outline-none focus:border focus:border-emerald-400  ${type=="number" && `[&::-webkit-inner-spin-button]:appearance-none
           [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]`}`} name={name} value={value ?? ""} placeholder=" " disabled={disabled}  onChange={(e)=>handleInputChange(e)} onBlur={handleBlur}/>
            <label htmlFor={id} className={`absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-3.5 ${isValid ? "text-gray-200" : "text-red-400"} peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-emerald-400 pointer-events-none`}>{label}</label>
            {
                !isValid ?
                <p className="m-0 p-0 w-fit absolute bottom-[-11px] left-2 bg-red-500 px-3 text-[13px] z-500 rounded-lg">{errorText}</p>
                :
                <></>
            }
        </div>
    )
}

export default StyledInput;