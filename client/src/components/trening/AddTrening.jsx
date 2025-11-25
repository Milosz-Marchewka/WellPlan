import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";
import StyledSelect from "../inputs/StyledSelect";
import { use, useEffect, useState } from "react";
import "./AddTrening.css";

const AddTrening = ({user, cancelFunction, foreignSet, setParentLog}) => {

    const [inputsErrors, setInputsErrors] = useState({
        day: null,
        type: null,
        name: null,
        series: null,
        repeat: null,
    });

    const [treningData, setTreningData] = useState({
        type: "",
        day: "monday",
        plan: []
    });
    
    const [log, setLog] = useState({level: "", message: ""})

    const [exercise, setExercise] = useState({
        name: "",
        series: "",
        repeat: "",
    });

    const [inputsError, setInputsError] = useState({
        type: null,
        name: null,
        series: null,
        repeat: null,
        plan: null,
    });

    const handleChange = (e) => {
        setTreningData(prev => ({...prev, [e.target.name]: e.target.value}));
        setInputsErrors(prev => ({...prev, [e.target.name]: null}));
    }

    const handleExerciseChange = (e) => {
        setExercise(prev => ({...prev, [e.target.name]: e.target.value}));
        setInputsErrors(prev => ({...prev, [e.target.name]: null}));
    }

    const addExercise = () => {

        let isErrors = false;
        if(exercise.name.trim() == ""){
            setInputsErrors(prev => ({...prev, name: 1}));
            isErrors = true;
        }
        if(exercise.series.trim() == ""){
            setInputsErrors(prev => ({...prev, series: 1}));
            isErrors = true;
        }
        if(exercise.repeat.trim() == ""){
            setInputsErrors(prev => ({...prev, repeat: 1}));
            isErrors = true;
        }

        if(isErrors){
            setLog({level: "error", message: "Prosze wypełnić wszystkie pola dodaj ćwiczenie"});
            return;
        }

        setInputsErrors(prev => ({...prev, plan: null}));
        setTreningData(prev => ({
            ...prev,
            plan: [
                ...prev.plan, 
                [exercise.name, exercise.series, exercise.repeat]
            ]
        }));
        setExercise(prev => ({
            name: "",
            series: "",
            repeat: "",
        }));
    }

    const addTrening = () => {
        if(treningData.type.trim() == ""){
            setInputsErrors(prev => ({...prev, type: 1}));
            setLog({level: "error", message: "Prosze wypełnić pole typ treningu"});
            return;
        }
        if(treningData.plan.length < 1){
            setInputsErrors(prev => ({...prev, plan: 1}));
            setLog({level: "error", message: "Wymagane jest przynajmniej jedno ćwiczenie"});
            return;
        }


        (async()=>{
            await addTraining(user?.email, treningData);
            foreignSet(user?.email);
        })();

        cancelFunction();
    }

    const addTraining = async(email, data)=>{
        try{
            const req = await fetch("http://localhost:5000/training/add", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    training: data
                })
            });

            if(!req.ok){
                return;
            }

            const res = await req.json();
            setParentLog({level: "info", message: "Pomyślnie dodano nowy trening"});
            return res;
        }
        catch(e){
            setParentLog({level: "error", message: "Nie dodano treningu, błąd serwera"});
            return;
        }
    }

    return(
        <div className="text-center mx-1 h-fit md:w-3/4 lg:w-1/3 shadow-lg shadow-gray-800 rounded-2xl overflow-hidden md:mx-auto">
            <h3 className="w-full bg-gray-900 text-emerald-400 text-2xl p-5 flex justify-around">
                <div></div>
                <div className="flex-1">
                    Dodaj nowy trening
                </div>
                <div className="text-red-600 font-bold cursor-pointer" onClick={cancelFunction}>X</div>
            </h3>
            <div className="bg-gray-800 p-5 flex flex-col gap-3">
                <StyledSelect label="Dzień tygodnia" options={[
                    { value: "Monday", title: "Poniedziałek" },
                    { value: "Tuesday", title: "Wtorek" },
                    { value: "Wednesday", title: "Środa" },
                    { value: "Thursday", title: "Czwartek" },
                    { value: "Friday", title: "Piątek" },
                    { value: "Saturday", title: "Sobota" },
                    { value: "Sunday", title: "Niedziela" }
                ]}
                name="day"
                valid={inputsErrors.day === null}
                onChange={handleChange}
                />
                <StyledInput label="Typ treningu (FBW, Pull, Push itd)" name="type" value={treningData.type} valid={inputsErrors.type === null} onChange={(e) => handleChange(e)}/>
                <div className="border-y border-white py-5">
                    <h6 className="text-white text-left mb-1">Dodaj ćwiczenie:</h6>
                    <StyledInput label={"Nazwa ćwiczenia"} name="name" value={exercise.name} valid={inputsErrors.name === null} onChange={handleExerciseChange}/>
                    <div className="flex gap-2 mt-2">
                        <StyledInput label={"Ilość serii"} name="series" value={exercise.series} valid={inputsErrors.series === null} onChange={handleExerciseChange}/>
                        <StyledInput label={"Ilość powtórzeń/Długość"} name="repeat" value={exercise.repeat} valid={inputsErrors.repeat === null} onChange={handleExerciseChange}/>
                        <StyledButton text="Dodaj" click={addExercise}/>
                    </div>
                </div>
                <table className="text-white w-full mx-auto" style={(inputsErrors.plan == 1 ? {border: "2px solid red"} : {})}>
                    <thead>
                        <tr>
                            <th>Ćwiczenie</th>
                            <th>Ilość Serii</th>
                            <th>Powtórzenia/Długość</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            treningData.plan.map((element, _) => (
                                <tr>
                                    <td>{element[0]}</td>
                                    <td>{element[1]}</td>
                                    <td>{element[2]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <StyledButton text="Dodaj trening" click={addTrening}/>
            </div>
                {
                    log.level == "error" ?
                    <h1 className="text-2xl bg-red-400 text-gray-900 p-3">{log.message}</h1>
                    :
                    <></>
                }
        </div>
    );
}

export default AddTrening;