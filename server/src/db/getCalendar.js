import { User } from "../models/User.js";

export const getCalendar = ({email, date}, res)=>{
    if(!email || !date){
        return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
    }
    const user = User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Nie znaleziono użytkownika."});
    }

    const day = user.activities[date] || {};
    return res.status(200).json({activities: day});
}