import { User } from "../models/User.js";

export const getTraining = async ({email}, res)=>{
    if(!email) return res.status(400).json({error: "Proszę podać email."});

    try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({error: "Nie znaleziono użytkownika."});

        return res.status(200).json(user?.training || {});
    } catch(e){
        return res.status(500).json({error: "Błąd serwera."});
    }
}