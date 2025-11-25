import { User } from "../models/User";

export const getSchedule = async ({email, date}, res)=>{
    try{
        if(!email) return res.status(400).json({error: "Proszę wprowadzić e-mail."});
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({error: "Nie znaleziono użytkownika."});

        const weekDay = date.getDay() + 1;
        let scheduleDay;
        if(user?.schedule){
            for(const key in user?.schedule){
                if(key === weekDay) scheduleDay = user?.schedule[key];
            }
        }

        return res.status(200).json({schedule: scheduleDay || {}})
    } catch(e){
        console.log(e);
        return res.status(500).json({error: e.message});
    }
}