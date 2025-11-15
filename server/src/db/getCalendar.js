import { User } from "../models/User.js";

export const getCalendar = async ({email, date}, res)=>{
    if(!email || !date){
        return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Nie znaleziono użytkownika."});
    }

    const day = user.activities[date] || [];
    console.log(day);
    return res.status(200).json(day);
}