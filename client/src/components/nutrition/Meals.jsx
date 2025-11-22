import { useState, useEffect } from "react";
import Owsianka from "../../assets/meals/Owsianka.jpg";
import Meal from "./Meal";

const Meals = () => {

    const [meals, setMeals] = useState({});

    useEffect(()=>{
        (async()=>{
            const temp = await fetchMeals("breakfast", 2500);
            setMeals(temp);
            console.log(temp);
        })();
    }, []);

    const fetchMeals = async(type, calories)=>{
        try{
            const req = await fetch(`http://localhost:5000/nutrition/meals?type=${type}&calories=${calories}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            if(!req.ok){
                console.log("Błąd pobierania danych.", await req.text());
                return;
            }

            const res = await req.json();

            return res;
        } catch(err){
            console.log("Błąd serwera.");
        }
    }
    
    return(
        <div className="w-full">
            <div className="w-full bg-emerald-600 h-20 rounded-2xl flex items-center justify-center">
                <p>Tu bedą filtry</p>
            </div>
            <div className="w-full py-2">
                <div className="flex flex-col gap-3">
                    <Meal imgUrl={Owsianka} title="Owsianka" prepDifficulty={0} prepTime="30min" macronutrients={{calories: 700, protein: 30, fat: 20, carbs: 40}}/>
                    <Meal imgUrl={Owsianka} title="Owsianka" prepDifficulty={0} prepTime="30min" macronutrients={{calories: 700, protein: 30, fat: 20, carbs: 40}}/>
                    <Meal imgUrl={Owsianka} title="Owsianka" prepDifficulty={0} prepTime="30min" macronutrients={{calories: 700, protein: 30, fat: 20, carbs: 40}}/>
                    <Meal imgUrl={Owsianka} title="Owsianka" prepDifficulty={0} prepTime="30min" macronutrients={{calories: 700, protein: 30, fat: 20, carbs: 40}}/>
                </div>
            </div>
        </div>
    );

}

export default Meals;