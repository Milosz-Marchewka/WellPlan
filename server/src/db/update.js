import { User } from "../models/User.js";
import { keys } from "../util/keys.js";

export const update = async(body, res)=>{

    try{
        console.log(body);
        if(!body.email){
            return res.status(400).json({error: "Proszę wpisać adres email"});
        }

        if([body.email.trim(), body.name.trim(), body.surname.trim(), body.gender].some(k=>(k == null || k === ""))) return res.status(400).json({error: "Wypełnij wszystkie wymagane pola."});
        if([body.age, body.weight, body.height].some(k=>(k == null || k === 0))) return res.status(400).json({error: "Proszę wypełnić wszystkie wymagane pola - dla pól numerycznych, nie może to być zero."});

        const search_mail = body?.oldEmail ? body?.oldEmail : body.email;

        const update = Object.fromEntries(Object.entries(body).filter(([key, value])=> key!=='oldEmail' && key != null && keys.includes(key)));
        const result = await User.updateOne(
            {email  : search_mail},
            {$set: update}
        );
        if(result.matchedCount === 0) return res.status(400).json({error: "Błąd aktualizowania danych."});
        const user = await User.findOne({email: body.email});
        const {password, __v, _id, ...safe} = user.toObject();
        return res.status(200).json({message: "Pomyślnie zaktualizowano dane użytkownika.", user: safe || {}})
    } catch(e){
        return res.status(500).json({error: "Błąd serwera."});
    }
}