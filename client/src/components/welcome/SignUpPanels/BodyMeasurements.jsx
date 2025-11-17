import { useEffect, useState, useContext, useRef } from "react";
import { SignupContext } from "../SignUp";
import StyledInput from "../../inputs/StyledInput";
import StyledButton from "../../buttons/StyledButton";

const BodyMeasurements = () => {
    const {handleChange, handleChangeManual,  userData} = useContext(SignupContext);

    const [nutrients, setNutrients] = useState({
        calories: 0,
        proteins: 0,
        fat: 0,
        carbs: 0
    });

    const [activityLevel, setActivityLevel] = useState(userData.activityLevel == null ? null : userData.activityLevel);

    const handleActivityLevelChange = (level) => {
        setActivityLevel(level);
        handleChangeManual("activityLevel", level);
    }

    const selectedStyle = {
        backgroundColor: "green"
    }

    useEffect(()=>{
        if([userData.age, userData.gender, userData.weight, userData.height, userData.activityLevel].some(v=>v==null)) return;
        console.log(activityLevel);
        try{
            (async ()=>{
                const url = `age=${userData.age}&gender=${userData.gender}&height=${userData.height}&weight=${userData.weight}&activity=${userData.activityLevel}`;
                const req = await fetch(`http://localhost:5000/nutrition?${url}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if(!req.ok){
                    console.log(await req.text());
                    return;
                }

                const res = await req.json();
                console.log(res);
                setNutrients(res);
            })();
        }
        catch(e){
            console.log("Błąd serwera.");
            return;
        }
    }, [userData.age, userData.gender, userData.weight, userData.height, userData.activityLevel]);

    return(
        <div className="flex flex-col gap-5">
            <div>
                <h2>Dane biometryczne:</h2>
                <div className="grid grid-cols-2 gap-2 mt-3">
                    <StyledInput type="number" label="Wzrost (cm)" name="height" onChange={handleChange} value={userData.height}/>
                    <StyledInput type="number" label="Waga (kg)" name="weight" onChange={handleChange} value={userData.weight}/>
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
                        <h4 className="text-2xl">
                            {nutrients.calories && nutrients.calories}g
                        </h4>
                    </div>
                    <div className="text-cyan-300">
                        <p>Białko</p>
                        <h4 className="text-2xl">
                            {nutrients.protein && nutrients.protein}g
                        </h4>
                    </div>
                    <div className="text-yellow-400">
                        <p>Tłuszcze</p>
                        <h4 className="text-2xl">
                            { nutrients.fat && nutrients.fat }g
                        </h4>
                    </div>
                    <div className="text-rose-400">
                        <p>Węglowodany</p>
                        <h4 className="text-2xl">
                            { nutrients.carbs && nutrients.carbs}g
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyMeasurements;