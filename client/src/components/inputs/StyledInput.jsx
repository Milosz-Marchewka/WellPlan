const StyledInput = ({id, type="text", label, name, value, width = "w-full", mt = "mt-0", disabled = false, onChange})=>{
    let additionalClasses = "";
    if(disabled){
        additionalClasses += "opacity-60 font-italic italic";
    }
    return(
        <div className={`relative ${width} ${mt} ${additionalClasses}`}>
            <input type={type} id={id} class={`bg-gray-600 peer text-white outline-none border border-white rounded-xl px-3 pt-5 pb-2 w-full focus:outline-none focus:border focus:border-emerald-400 ${type=="number" && `[&::-webkit-inner-spin-button]:appearance-none
           [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]`}`} name={name} value={value} placeholder=" " disabled={disabled}  onChange={onChange}/>
            <label for={id} class={`absolute left-3 top-1 text-gray-200 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-200 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-emerald-400 pointer-events-none`}>{label}</label>
        </div>
    )
}

export default StyledInput;