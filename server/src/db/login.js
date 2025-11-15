import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const login = async ({email, password}, res)=>{
    if(!email || !password){
        return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Nie znaleziono użytkownika."});
    }

    if(!(await bcrypt.compare(password, user.password))){
        return res.status(400).json({error: "Niepoprawne hasło."});
    }
        
    return res.status(200).json({message: "Pomyślnie zalogowano."});
}