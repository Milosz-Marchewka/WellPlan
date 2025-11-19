import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.RECIPE_KEY;

export const getMeals = async ({type, calories}, res)=>{
    console.log(type, calories);
    if(!calories || !type) return res.status(400).json({error: "Proszę wypełnić wszystkie pola"});
    try{
        const req = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&type=${type}&maxCalories=${calories}&addRecipeNutrition=true&number=1`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        if(!req.ok){
            console.log(await req.text());
            return res.status(500).json({error: await req.text()});
        }

        const result = await req.json();
        console.log(result.results[0]);
        return res.status(200).json({result: result.results[0]});
    } catch(e){
        return res.status(500).json({error: e.message});
    }
}