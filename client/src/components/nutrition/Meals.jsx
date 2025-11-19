import Owsianka from "../../assets/meals/Owsianka.jpg";
import Meal from "./Meal";

const Meals = () => {
    
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