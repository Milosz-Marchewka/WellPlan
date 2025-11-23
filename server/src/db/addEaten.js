import { User } from "../models/User.js";

export const addEaten = async ({email, calories, protein, fat, carbs}, res)=>{
    if([email, calories, protein, fat, carbs].some(k=>!k)) return res.status(400).json({error: "Proszę wypełnić wszystkie pola."});

    try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({error: "Nie znaleziono takiego użytkownika."});

        const today = new Date().toISOString()?.split("T")[0];

        await user.updateOne({$inc: {
            [`eaten.${today}.calories`]: Number(calories) || 0,
            [`eaten.${today}.protein`]: Number(protein) || 0,
            [`eaten.${today}.fat`]: Number(fat) || 0,
            [`eaten.${today}.carbs`]: Number(carbs) || 0
        }});

        return res.status(200).json({message: "Pomyślnie dodano."});
    } catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Błąd serwera."});
    }
}