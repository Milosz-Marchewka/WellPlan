import { User } from "../models/User.js";

export const addTraining = async ({email, training}, res)=>{
    const {type, day, plan} = training;
    if(!day || !type || plan?.length <= 0) return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza lub dodać co najmniej jedno ćwiczenie"});
    try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({error: "Nie znaleziono użytkownika."});

        await User.updateOne(
            {email},
            {$push: {[`training.${day}`]: {type, plan}}}
        );

        return res.status(200).json({message: "Pomyślnie dodano."});
    } catch(e){
        return res.status(500).json({error: "Błąd serwera."});
    }
}