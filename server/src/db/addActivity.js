import { User } from "../models/User.js";
import { emailRegex } from "../util/regex.js";

export const addActivity = async ({email, name, date, start, end, color}, res)=>{
    console.log(color);
    if(!email || !name || !date || !start || !end){
        return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
    }

    email = email.trim();
    if(!emailRegex(email)) return res.status(400).json({error: "Niepoprawny email."});

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Nie znaleziono użytkownika."});
        }

        await User.updateOne(
            {email},
            {$push: {[`activities.${date}`]: {name, start, end, date, color: color || "#FFFFFF"}}}
        );

        return res.status(200).json({message: "Pomyślnie dodano."});
    } catch(e){
        return res.status(500).json({error: e});
    }
}