import { useEffect, useState, useContext, useRef } from "react";
import { SignupContext } from "../SignUp";
import StyledInput from "../../inputs/StyledInput";
import StyledButton from "../../buttons/StyledButton";

const BodyMeasurements = () => {
    const {handleChange, handleChangeManual, newUser, setCanProgress} = useContext(SignupContext);

    const [activityLevel, setActivityLevel] = useState(newUser?.activityLevel || 0);
    const [nutrients, setNutrients] = useState({
            calories: 0,
            proteins: 0,
            carbs: 0,
            fat: 0,
    });
    
    const [inputsErrors, setInputsErrors] = useState({
        weight: null,
        height: null,
    });


    const selectedStyle = {
        backgroundColor: "green"
    }

    useEffect(()=>{
        console.log(nutrients);
        (async ()=>{
            const data = await fetchNutrients(newUser?.age, newUser?.gender, newUser?.height, newUser?.weight, newUser?.activityLevel);
            setNutrients(data);
        })();
    },[newUser]);

    useEffect(()=>{
        console.log(newUser?.weight, newUser?.height, newUser?.activityLevel);
        setCanProgress(() => validate)   
    }, [setCanProgress, newUser]);

    const validate = () => {
        let isError = false;
        let newErrors = {
            weight: null,
            height: null,
        };


        if (!newUser?.weight || newUser.weight.trim() === "" || newUser.weight <= 0) {
            newErrors.weight = 1;
            isError = true;
        }
        if (!newUser?.height || newUser.height.trim() === "" || newUser.height <= 0) {
            newErrors.height = 1;
            isError = true;
        }

        setInputsErrors(prev => ({ ...prev, ...newErrors }));

        return !isError;
    }

    const handleActivityLevelChange = (level) => {
        setActivityLevel(level);
        handleChangeManual("activityLevel", level);
    }

    const fetchNutrients = async (age, gender, height, weight, activity)=>{
        const empty = {
            calories: 0,
            proteins: 0,
            carbs: 0,
            fat: 0,
        }
        if([age,gender,height,weight,activity].some(v=>v==null)){
            console.log("Nie wpisano wszystkich danych.");
            return empty;
        }
        try{
            const url = `age=${age}&gender=${gender}&height=${height}&weight=${weight}&activity=${activity}`;
            const req = await fetch(`http://localhost:5000/nutrition/macronutrients?${url}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            if(!req.ok){
                console.log("Błąd obliczania danych.", await req.text());
                return empty;
            }

            const result = await req.json();
            return result;
        }catch (e){
            console.log("Błąd serwera.");
            return empty;
        }
    }

    return(
        <div className="flex flex-col gap-5">
            <div>
                <h2>Dane biometryczne:</h2>
                <div className="grid grid-cols-2 gap-2 mt-3">
                    <StyledInput type="number" label="Wzrost (cm)" name="height" onChange={(e) => {handleChange(e); setInputsErrors(prev => ({...prev, [e.target.name]: null}))}} value={newUser?.height} valid={inputsErrors.height === null}/>
                    <StyledInput type="number" label="Waga (kg)" name="weight" onChange={(e) => {handleChange(e); setInputsErrors(prev => ({...prev, [e.target.name]: null}))}} value={newUser?.weight} valid={inputsErrors.weight === null}/>
                </div>
            </div>
            <div>
                <h2>Wybierz poziom aktywności fizycznej</h2>
                <div className="flex flex-row flex-wrap gap-1 justify-center justify-items-center items-center text-center mt-3">
                    <div className="w-30 bg-gray-900 p-2 hover:bg-emerald-600 transition-all cursor-pointer"
                        onClick={() => handleActivityLevelChange(0)}
                        style={activityLevel === 0 ? selectedStyle : {}}
                    >
                        <p className="text-xl">💻</p>
                        <p>Brak</p>
                    </div>
                    <div className="w-30 bg-gray-900 py-2 hover:bg-emerald-600 transition-all cursor-pointer"
                        onClick={() => handleActivityLevelChange(1)}
                        style={activityLevel === 1 ? selectedStyle : {}}
                    >
                        <p className="text-xl">🚶‍♂️</p>
                        <p>Niska</p>
                    </div>
                    <div className="w-30 bg-gray-900 py-2 hover:bg-emerald-600 transition-all cursor-pointer"
                        onClick={() => handleActivityLevelChange(2)}
                        style={activityLevel === 2 ? selectedStyle : {}}
                    >
                        <p className="text-xl">🏃‍♂️</p>
                        <p>Umiarkowana</p>
                    </div>
                    <div className="w-30 bg-gray-900 py-2 hover:bg-emerald-600 transition-all cursor-pointer"
                        onClick={() => handleActivityLevelChange(3)}
                        style={activityLevel === 3 ? selectedStyle : {}}
                    >
                        <p className="text-xl">🏋️‍♂️</p>
                        <p>Wysoka</p>
                    </div>
                    <div className="w-30 bg-gray-900 py-2 hover:bg-emerald-600 transition-all cursor-pointer"
                        onClick={() => handleActivityLevelChange(4)}
                        style={activityLevel === 4 ? selectedStyle : {}}
                    >
                        <p className="text-xl">🔝</p>
                        <p>Bardzo Wysoka</p>
                    </div>
                </div>
            </div>
            <div>
                <h6>Twoje zapotrzebowanie żywieniowe:</h6>
                <div className="grid grid-cols-2 grid-rows-2 text-center mt-3">
                    <div className="text-lime-400">
                        <p>Kalorie</p>
                        <h4 className="text-2xl">{nutrients?.calories} kcal</h4>
                    </div>
                    <div className="text-cyan-300">
                        <p>Białko</p>
                        <h4 className="text-2xl">{nutrients?.proteins}g</h4>
                    </div>
                    <div className="text-yellow-400">
                        <p>Tłuszcze</p>
                        <h4 className="text-2xl">{nutrients?.fat}g</h4>
                    </div>
                    <div className="text-rose-400">
                        <p>Węglowodany</p>
                        <h4 className="text-2xl">{nutrients?.carbs}g</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyMeasurements;