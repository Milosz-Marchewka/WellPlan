import { User } from "../models/User";

export const getSchedule = async ({email}, res)=>{
    try{
        if(!email) return res.status(400).json({error: "Proszę wprowadzić e-mail."});
        const user = User.findOne({email});

        if(!user) return res.status(400).json({error: "Nie znaleziono użytkownika."});

        return res.status(200).json({message: "Pomyślnie pobrano plan.", schedule: user.schedule})
    } catch(e){
        console.log(e);
        return res.status(500).json({error: "Błąd serwera."});
    }
}