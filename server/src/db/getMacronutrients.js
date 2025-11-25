const activities = [1.2, 1.375, 1.55, 1.725, 1.9];

export const getMacronutrients = ({age, height, weight, gender, activity}, res)=>{
    if(gender === "1" || gender === "Male"){
        gender = "male";
    } else if(gender === "0" || gender==="Female"){
        gender = "female";
    }

    if([age, height, weight, gender, activity].some(v=>!v)){
        return res.status(400).json({error: "Niepełne dane."});
    }
    if(activity < 0 || activity > 4){
        return res.status(400).json({error: "Nieprawidłowy poziom aktywności."});
    }


    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if(gender === "male"){
        bmr += 5;
    } else {
        bmr -= 161;
    }

    const tdee = Math.ceil(bmr * activities[activity]);

    const nutrients = {
        calories: tdee,
        proteins: Math.round((tdee * 0.3)/4),
        carbs: Math.round((tdee * 0.45)/4),
        fat: Math.round((tdee * 0.25)/9)
    }

    return res.status(200).json(nutrients || {});
}

export const getMacronutrientsRouteless = ({age, height, weight, gender, activity})=>{
    if(gender === "1" || gender === "Male"){
        gender = "male";
    } else if(gender === "0" || gender==="Female"){
        gender = "female";
    }

    if([age, height, weight, gender].some(v=>!v)){
        return {};
    }
    if(activity < 0 || activity > 4){
        return {};
    }


    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if(gender === "male"){
        bmr += 5;
    } else {
        bmr -= 161;
    }

    const tdee = Math.ceil(bmr * activities[activity]);

    const nutrients = {
        calories: tdee,
        proteins: Math.round((tdee * 0.3)/4),
        carbs: Math.round((tdee * 0.45)/4),
        fat: Math.round((tdee * 0.25)/9)
    }

    return nutrients;
}