import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const update = async(body, res)=>{

    try{
        if(!body.email){
            return res.status(400).json({error: "Proszę wpisać adres email"});
        }

        if([body.email.trim(), body.name.trim(), body.surname.trim(), body.gender].some(k=>(k == null || k === ""))) return res.status(400).json({error: "Wypełnij wszystkie wymagane pola."});
        if([body.age, body.weight, body.height].some(k=>(k == null || k === 0))) return res.status(400).json({error: "Proszę wypełnić wszystkie wymagane pola - dla pól numerycznych, nie może to być zero."})

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