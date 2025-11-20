import {useState} from "react"
import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";
import StyledCheckbox from "../inputs/StyledCheckbox";
import StyledColorInput from "../inputs/StyledColorInput";

const AddMeal = () => {

    const [mealData, setMealData] = useState({
        title: "",
        calories: "",
        protein: "",
        fats: "",
        carbs: ""
    });

    const handleChange = (e) => {
        setMealData(prev => ({...prev, [e.target.name]: e.target.value}));
        console.log(mealData);
    }

    const add = () => {
        console.log(mealData);
    }

    return(
        <div className="text-center h-fit w-full shadow-lg shadow-gray-800 rounded-2xl overflow-hidden">
            <h3 className="w-full bg-gray-900 text-emerald-400 text-2xl p-5">Dodaj posiłek</h3>
            <div className="bg-gray-800 p-2">
                <div className="mx-auto w-5/6 flex flex-col gap-5 bg-gray-800 py-2">
                    <StyledInput label="Nazwa" name="title" onChange={handleChange} value={mealData.title}/>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2">
                        <StyledInput type="number" label="Kalorie (kcal)" name="calories" value={mealData.calories} onChange={handleChange}/>
                        <StyledInput type="number" label="Białko (g)" name="protein" value={mealData.protein} onChange={handleChange}/>
                        <StyledInput type="number" label="Tłuszcze (g)" name="fats" value={mealData.fats} onChange={handleChange}/>
                        <StyledInput type="number" label="Węglowodany (g)" name="carbs" value={mealData.carbs} onChange={handleChange}/>
                    </div>
                    <StyledButton text="Dodaj Posiłek" click={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddMeal;