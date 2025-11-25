import { useEffect, useState } from "react";
import EyeShow from "../../assets/icons/eyes/eyeShow.png";
import EyeHidden from "../../assets/icons/eyes/eyeHidden.png";

const StyledSelect = ({id, label, name, value, width = "w-full", mt = "mt-0", options = [], disabled = false, valid = true, onChange})=>{

    return(
        <div className={`relative ${width} ${mt}`}>
            <select id={id} className={`bg-gray-600 peer text-white outline-none border border-white rounded-xl px-3 pt-5 pb-2 w-full focus:outline-none focus:border focus:border-emerald-400`} name={name} value={value} placeholder=" " disabled={disabled}  onChange={onChange}>
                {
                    options.map((element, index) => (
                        <option key={index} value={element.value}>{element.title}</option>
                    ))
                }
            </select>
            <label htmlFor={id} className={`absolute left-3 text-white top-1 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-emerald-400 pointer-events-none`}>{label}</label>
        </div>
    )
}

export default StyledSelect;