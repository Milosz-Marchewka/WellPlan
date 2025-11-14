import { User } from "../models/User.js";

export const addActivity = async ({email, name, date, start, end}, res)=>{
    if(!name || !date || !start || !end){
        return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
    }

    email = email.trim();

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Nie znaleziono użytkownika."});
        }

        await User.updateOne(
            {email},
            {$push: {[`activities.${date}`]: {name, start, end, date}}}
        );

        return res.status(200).json({message: "Pomyślnie dodano."});
    } catch(e){
        console.log("holup..", e);
        return res.status(500).json({error: e});
    }
}