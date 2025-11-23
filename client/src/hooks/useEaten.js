import { useState, useEffect } from "react";

export const useEaten = (email)=>{
    const [eaten, setEaten] = useState(null);

    const fetchEaten = async ()=>{
        if(!email) return;
        try{
            const req = await fetch(`http://localhost:5000/nutrition/get?email=${email}`, {
                method: "GET"
            })

            if(!req.ok){
                console.log(await req.text());
                return;
            }
            
            const data = await req.json();
            console.log("EATEN hook", data);
            setEaten(data);
        } catch(e){
            console.log('catcherr');
            return;
        }
    }

    useEffect(()=>{
        fetchEaten();
    }, [eaten]);

    return {eaten, setEaten, fetchEaten};
}