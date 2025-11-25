import { useEffect } from "react";

const StyledRadios = ({name, options, label, selected, onChange})=>{
    return(
        <div>
            <h4>{label}</h4>
            <div className="flex justify-left flex-wrap gap-5">
                {
                    options.map((text, index) => (
                        <div key={index}>
                            <input type="radio" name={name} id={`${name}${index}`} className="mr-2 cursor-pointer" value={index} onChange={(e) => onChange(index)} checked={selected == index}/>
                            <label htmlFor={`${name}${index}`} className="cursor-pointer">{text}</label>
                        </div>
                    ))

                }
            </div>
        </div>
    );
}

export default StyledRadios;