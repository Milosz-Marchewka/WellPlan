import { useEffect, useState } from "react";
import EyeShow from "../../assets/icons/eyes/eyeShow.png";
import EyeHidden from "../../assets/icons/eyes/eyeHidden.png";

const StyledInput = ({id, type="text", label, name, value, width = "w-full", mt = "mt-0", disabled = false, valid = true, onChange})=>{
    let additionalClasses = "";

    const [isHidden, setIsHidden] = useState(true);
    const [isValid, setIsValid] = useState(valid);


    useEffect(() => {
        setIsValid(valid);
        console.log(value);
    }, [valid]);


    const handleClick = () =>{
        setIsHidden(prev => !prev);
    }

    const validate = () => {
        if(value.trim() == ""){
            console.log("sprawdzam");
            setIsValid(false);
            return;
        }

        setIsValid(true);
    }

    if(disabled){
        additionalClasses += "opacity-60 font-italic italic";
    }
    else if(valid){
        // additionalClasses +=
    }
    return(
        type === "password" ?
        <div className={`relative ${width} ${mt} ${additionalClasses}`}>
            <input type={isHidden ? type : "text"} id={id} className={`bg-gray-600 peer text-white outline-none border ${isValid ? "border-white" : "border-red-500"} rounded-xl px-3 pt-5 pb-2 w-full focus:outline-none focus:border focus:border-emerald-400`} name={name} value={value} placeholder=" " disabled={disabled}  onChange={onChange}/>
            <label htmlFor={id} className={`absolute left-3 top-1 text-gray-200 text-sm transition-all peer-placeholder-shown:top-3.5 ${isValid ? "peer-placeholder-shown:text-gray-200" : "text-red-400"} peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-emerald-400 pointer-events-none`}>{label}</label>
            <span className={"absolute right-4 top-3.5 cursor-pointer"} onClick={handleClick}><img className="size-6 filter invert" src={isHidden ? EyeHidden : EyeShow}/></span>
        </div>
        :
        <div className={`relative ${width} ${mt} ${additionalClasses}`}>
            <input type={type} id={id} class={`bg-gray-600 peer text-white outline-none border ${isValid ? "border-white" : "border-red-500"} rounded-xl px-3 pt-5 pb-2 w-full focus:outline-none focus:border focus:border-emerald-400  ${type=="number" && `[&::-webkit-inner-spin-button]:appearance-none
           [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]`}`} name={name} value={value} placeholder=" " disabled={disabled}  onChange={onChange} onBlur={validate}/>
            <label htmlFor={id} className={`absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-3.5 ${isValid ? "text-gray-200" : "text-red-400"} peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-emerald-400 pointer-events-none`}>{label}</label>
        </div>
    )
}

export default StyledInput;