import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const login = async ({email, password}, res)=>{
    if(!email || !password){
        return res.status(400).json({id: 1, error: "Proszę wypełnić wszystkie pola formularza."});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({id: 2, error: "Nie znaleziono użytkownika."});
    }

    if(!(await bcrypt.compare(password, user.password))){
        return res.status(400).json({id: 3, error: "Niepoprawne hasło."});
    }

    const {password: _pass, _id, __v, ...safe} = user.toObject();
    return res.status(200).json({message: "Pomyślnie zalogowano.", user: safe});
}