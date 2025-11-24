import {useState} from "react"
import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";
import StyledCheckbox from "../inputs/StyledCheckbox";
import StyledColorInput from "../inputs/StyledColorInput";

const AddMeal = ({user, setEaten, fetchEaten}) => {

    const [mealData, setMealData] = useState({
        title: "",
        calories: "",
        protein: "",
        fats: "",
        carbs: ""
    });

    const [log, setLog] = useState({level: "", message: ""})
    const [inputsError, setInputsError] = useState({
        title: null,
        calories: null,
        protein: null,
        fats: null,
        carbs: null
    });

    const handleChange = (e) => {
        setMealData(prev => ({...prev, [e.target.name]: e.target.value}));
        setInputsError(prev => ({...prev, [e.target.name]: null}));
    }

    const add = () => {
        let isError = false;
        if(mealData.title.trim() == ""){
            setInputsError(prev => ({...prev, title: 1}));
            isError = true;
        }
        if(mealData.calories.trim() == ""){
            setInputsError(prev => ({...prev, calories: 1}));
            isError = true;
        }
        if(mealData.protein.trim() == ""){
            setInputsError(prev => ({...prev, protein: 1}));
            isError = true;
        }
        if(mealData.fats.trim() == ""){
            setInputsError(prev => ({...prev, fats: 1}));
            isError = true;
        }
        if(mealData.carbs.trim() == ""){
            setInputsError(prev => ({...prev, carbs: 1}));
            isError = true;
        }
        
        fetchEaten();

        if(isError){
            setLog({level: "error", message: "Prosze wypełnić wszystkie pola"});
            return;
        }

        (async()=>{
            console.log(user?.email, mealData.calories, mealData.protein, mealData.fats, mealData.carbs);
            try{
                const req = await fetch("http://localhost:5000/nutrition/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user?.email,
                        calories: mealData.calories,
                        protein: mealData.protein,
                        fat: mealData.fats,
                        carbs: mealData.carbs
                    })
                })

                if(!req.ok){
                    console.log(await req.text())
                    setLog({level: "error", message: req.text()})
                }
                console.log(await req.json());
                setLog({level: "info", message: "Pomyślnie dodano posiłek"})

                setMealData({
                    title: "",
                    calories: "",
                    protein: "",
                    fats: "",
                    carbs: ""
                });
            } catch(e){
                setLog({level: "error", message: "Błąd serwera"});
            }
        })();
        setEaten(fetchEaten());
    }

    return(
        <div className="w-full h-fit">
            <div className="text-center h-fit w-full shadow-lg shadow-gray-800 rounded-2xl overflow-hidden">
                <h3 className="w-full bg-gray-900 text-emerald-400 text-2xl p-5">Dodaj posiłek</h3>
                <div className="bg-gray-800 p-2">
                    <div className="mx-auto w-5/6 flex flex-col gap-5 bg-gray-800 py-2">
                        <StyledInput label="Nazwa" name="title" onChange={handleChange} value={mealData.title} valid={inputsError.title == null}/>
                        <div className="grid grid-cols-2 grid-rows-2 gap-2">
                            <StyledInput type="number" label="Kalorie (kcal)" name="calories" value={mealData.calories} onChange={handleChange} valid={inputsError.calories == null}/>
                            <StyledInput type="number" label="Białko (g)" name="protein" value={mealData.protein} onChange={handleChange} valid={inputsError.protein == null}/>
                            <StyledInput type="number" label="Tłuszcze (g)" name="fats" value={mealData.fats} onChange={handleChange} valid={inputsError.fats == null}/>
                            <StyledInput type="number" label="Węglowodany (g)" name="carbs" value={mealData.carbs} onChange={handleChange} valid={inputsError.carbs == null}/>
                        </div>
                        <StyledButton text="Dodaj Posiłek" click={add}/>
                    </div>
                </div>
                {
                    log.level == "error" ?
                    <h1 className="text-2xl bg-red-400 text-gray-900 p-3">{log.message}</h1>
                    :
                    log.level == "info" ?
                    <h1 className="text-2xl bg-green-400 text-gray-900 p-3">{log.message}</h1>
                    :
                    <></>
                }
            </div>
        </div>
    );
}

export default AddMeal;