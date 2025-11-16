import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const update = async()=>{

    try{
        if([body.name, body.surname, body.email, body.password, body.gender, body.age, body.height, body.weight].some((v)=>!v)){
            return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
        }

        const update = Object.fromEntries(Object.entries(body).filter(([key, value])=> key != null));

        const hashed = bcrypt.hash(password, 10);

        update.password = hashed;

        const result = await User.updateOne(
            {email},
            {$set: update}
        );

        if(result.matchedCount === 0) return res.status(400).json({error: "Błąd aktualizowania danych."});

        const [password, __v, _id, ...safe] = await User.findOne({email}).toObject();
        return res.status(200).json({message: "Pomyślnie zaktualizowano dane użytkownika.", user: safe})
    } catch(e){
        console.log(e);
        return res.status(500).json({error: "Błąd serwera."});
    }
}