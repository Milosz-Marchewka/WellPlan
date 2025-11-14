import { User } from "../models/User.js";

export const addActivity = async ({email, name, date, start, finish}, res)=>{
    if(!name || !date || !start || !finish){
        return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
    }

    name = name.trim();

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Nie znaleziono użytkownika."});
        }

        const activities = user.activities || {};
        user.activities = {
            ...activities,
            [date]: [
                ...(user.activities[date] || []),
                {                
                    name,
                    start,
                    finish,
                }
            ]
        }

        await user.save();

        return res.status(200).json({message: "Pomyślnie dodano."});
    } catch(e){
        return res.status(500).json({error: "Błąd serwera."});
    }
}