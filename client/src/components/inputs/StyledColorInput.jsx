const StyledColorInput = ({id, label, name, value, onChange})=>{


    return(
        <div className="text-white flex gap-5 h-fit items-center px-5">
            <label htmlFor={id}>{label}</label>
            <input className="block w-20 flex-1 cursor-pointer outline-0 rounded-lg appearance-none" type="color" name={name} id={id} value={value} onChange={onChange}/>
        </div>
    );
}

export default StyledColorInput;