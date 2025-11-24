import { useState } from "react";

export const useEaten = (email)=>{
    const [eaten, setEaten] = useState(null);

    const fetchEaten = async ()=>{
        if(!email) return {level: "error", message: "Nie rozpoznano użytkownika"};;
        try{
            const req = await fetch(`http://localhost:5000/nutrition/get?email=${email}`, {
                method: "GET"
            })

            if(!req.ok){
                return {level: "error", message: await req.text()};
            }
            
            const data = await req.json();
            console.log("EATEN hook", data);
            setEaten(data);
            return {level: "", message: ""};
        } catch(e){
            return {level: "error", message: "Błąd serwera"};
        }
    }

    return {eaten, setEaten, fetchEaten};
}