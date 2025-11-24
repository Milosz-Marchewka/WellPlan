import { User } from "../models/User.js"
import { getMacronutrientsRouteless } from "./getMacronutrients.js";

export const getEaten = async({email}, res)=>{
    if(!email) return res.status(400).json({error: "Nie podano użytkownika."});

    try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({error: "Nie znaleziono użytkownika.", user: email});

        const today = new Date().toISOString()?.split("T")[0];
        const eaten = user?.eaten[today];
        const ceil = getMacronutrientsRouteless({age: user?.age, weight: user?.weight, height: user?.height, gender: user?.gender, activity: user?.activityLevel}, res);


        const percentages = {
            calories: eaten?.calories == null ? 0 : Math.round((eaten?.calories / ceil?.calories) * 100),
            proteins: eaten?.proteins == null ? 0 : Math.round((eaten?.proteins / ceil?.proteins) * 100),
            fat: eaten?.fat == null ? 0 : Math.round((eaten?.fat / ceil?.fat) * 100),
            carbs: eaten?.carbs == null ? 0 : Math.round((eaten?.carbs / ceil?.carbs) * 100)
        }
        console.log(percentages);
        return res.status(200).json({
            eaten: eaten,
            max: ceil,
            percentages: percentages
        });
    } catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Błąd serwera."});
    }
}