import { useState, useEffect } from "react";
import Owsianka from "../../assets/meals/Owsianka.jpg";
import Meal from "./Meal";
import StyledInput from "../inputs/StyledInput";

const Meals = () => {

    const [log, setLog] = useState(null);
    const [meals, setMeals] = useState([]);
    const [searchingValues, setSearchingValues] = useState(
        {
            product: "",
            calories: 2500,
        }
    );

    useEffect(()=>{
        (async()=>{
            const temp = await fetchMeals("", 2500);
            setMeals(temp);
            console.log(temp);
        })();
    }, []);

    useEffect(()=>{
        (async()=>{
            const temp = await fetchMeals(searchingValues.product, searchingValues.calories);
            setMeals(temp);
            console.log(temp);
        })();
    }, [searchingValues]);

    const handleChange = (e) => {
        setSearchingValues(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const fetchMeals = async(type, calories)=>{
        try{
            const req = await fetch(`http://localhost:5000/nutrition/meals?product=${type}&calories=${calories}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            if(!req.ok){
                console.log("Błąd pobierania danych.", await req.text());
                setLog("Błąd pobierania danych", await req.text());
                return;
            }

            const res = await req.json();
            setLog(null);
            return res;
        } catch(err){
            setLog("Błąd serwera");
            console.log("Błąd serwera.");
        }
    }
    
    return(
        <div className="w-full">
            <div className="w-full bg-emerald-600 h-20 rounded-2xl flex items-center justify-around">
                <StyledInput label="Szukaj posiłek" width="w-1/2" name="product" value={searchingValues.product} onChange={(e) => handleChange(e)}/>
                <StyledInput label="Podaj max ilosc kalorii" type="number" name="calories" value={searchingValues.calories} width="w-1/3" onChange={(e) => handleChange(e)}/>
            </div>
            <div className="w-full py-2">
                <div className="flex flex-col gap-3 items-center">
                    {   
                        log !== null ?
                            <div className="bg-gray-800 text-red-400 w-1/4 min-w-sm rounded-lg p-3 ">
                                <h5 className="text-2xl">Błąd:</h5>
                                <p className="text-lg">{log}</p>
                            </div>
                        :
                        Array.isArray(meals) && meals.length > 0 ?
                        meals.map((element, index) => (
                            <Meal imgUrl={element.imageUrl} title={element.product_name} ingredients={element.ingredients_text} macronutrients={{calories: element.nutriments["energy-kcal"], protein: element.nutriments.proteins, fat: element.nutriments.fat, carbs: element.nutriments.carbohydrates}}/>
                        ))
                        :
                        <h3 className="text-white">Nie znaleziono posiłków</h3>
                    }
                </div>
            </div>
        </div>
    );

}

export default Meals;