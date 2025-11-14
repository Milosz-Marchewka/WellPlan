const activities = [1.2, 1.375, 1.55, 1.725, 1.9];

export const getCalories = (({age, height, weight, gender, activity}, res)=>{
    if([age, height, weight, gender, activity].some(v=>!v)){
        return res.status(400).json({error: "Niepełne dane."});
    }
    if(activities < 0 || activities > 4){
        return res.status(400).json({error: "Nieprawidłowy poziom aktywności."});
    }
    try{
        let val = (10 * weight) + (6.25 * height) - (5 * age);
        if(gender === "Mężczyzna"){
            val += 5;
        } else {
            val -= 161;
        }
        return res.status(200).json({cal: Math.ceil(val * activities[activity])});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error: "Błąd serwera."});
    }
});