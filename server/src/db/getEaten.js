import { User } from "../models/User.js"

export const getEaten = async({email}, res)=>{
    if(!email) return res.status(400).json({error: "Nie podano użytkownika."});

    try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({error: "Nie znaleziono użytkownika."});

        const today = new Date().toISOString()?.split("T")[0];

        return res.status(200).json(user.eaten[today]);
    } catch(e){
        return res.status(500).json({error: "Błąd serwera."});
    }
}