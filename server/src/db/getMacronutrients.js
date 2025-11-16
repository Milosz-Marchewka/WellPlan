const activities = [1.2, 1.375, 1.55, 1.725, 1.9];

export const getMacronutrients = ({age, height, weight, gender, activity}, res)=>{
    if([age, height, weight, gender, activity].some(v=>!v)){
        return res.status(400).json({error: "Niepełne dane."});
    }
    if(activity < 0 || activity > 4){
        return res.status(400).json({error: "Nieprawidłowy poziom aktywności."});
    }


    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if(gender === "Mężczyzna"){
        bmr += 5;
    } else {
        bmr -= 161;
    }

    tdee = Math.ceil(bmr * activities[activity]);

    const nutrients = {
        calories: tdee,
        protein: Math.round((tdee * 0.3)/4),
        carbs: Math.round((tdee * 0.45)/4),
        fat: Math.round((tdee * 0.25)/9)
    }

    return res.status(200).json({nutrients});
}