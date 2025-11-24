import StyledInput from "../../inputs/StyledInput";
import StyledButton from "../../buttons/StyledButton";
import StyledCheckbox from "../../inputs/StyledCheckbox";
import { useEffect, useState, useContext } from "react";
import { SignupContext } from "../SignUp";
import "./Lifestyle.css";

const Lifestyle = () => {

    const { handleChange, handleChangeManual, newUser, handleSchedule, schedule, setCanProgress } = useContext(SignupContext);
    const [inputsErrors, setInputsErrors] = useState({
        sleep: null,
        wake: null,
        schedule: null,
    });

    useEffect(()=>{
        if(newUser === null) return;
    }, [newUser])

    const [numOfRow, setNumOfRows] = useState(6);
    const [isScheduleSkipped, setIsScheduleSkipped] = useState(newUser.isScheduleSkipped);

    const disabledScheduleClasses = "pointer-events-none select-none opacity-60 font-italic italic";

    useEffect(()=>{
        console.log(newUser?.wake, newUser?.sleep, schedule);
        setCanProgress(() => validate)   
    }, [setCanProgress, newUser]);

    const validate = () => {
        let isError = false;
        let newErrors = {
            sleep: null,
            wake: null,
            schedule: null,
        };


        if (!newUser?.sleep || newUser.sleep.trim() === "") {
            newErrors.sleep = 1;
            isError = true;
        }
        if (!newUser?.wake || newUser.wake.trim() === "") {
            newErrors.wake = 1;
            isError = true;
        }

        for(let i of schedule){
            if(i.start == "" || i.end == ""){
                if(i.monday.trim() != ""){
                    newErrors.schedule = 1;
                    isError = true;
                    break;
                }
                if(i.tuesday.trim() != ""){
                    newErrors.schedule = 1;
                    isError = true;
                    break;
                }
                if(i.wednesday.trim() != ""){
                    newErrors.schedule = 1;
                    isError = true;
                    break;
                }
                if(i.thursday.trim() != ""){
                    newErrors.schedule = 1;
                    isError = true;
                    break;
                }
                if(i.friday.trim() != ""){
                    newErrors.schedule = 1;
                    isError = true;
                    break;
                }
            }
        }

        setInputsErrors(prev => ({ ...prev, ...newErrors }));
        console.log(newErrors, newUser, schedule);
        return !isError;

    }

    const addRow = () => {
        setNumOfRows(n => n+1)
    }

    useEffect(()=>{
        const inputs = document.querySelectorAll(".scheduleInput");
        for(let i of inputs){
            i.value = getValue(i.parentElement.parentElement.dataset.id, i.name);
        }

        let max = 0;
        for(let i of schedule){
            max = i.index > max ? i.index : max;
        }
        if(numOfRow < max){
            setNumOfRows(p => max+1);
        }

    },[numOfRow]);

    const getLengthOfSleep = () => {
        if(newUser?.sleep == "" || newUser?.wake == ""){
            return "...";
        }

        let [h1, m1] = newUser?.wake ? newUser?.wake.split(":") : [0,0.1];
        h1 = Number(h1);
        m1 = Number(m1);
        let [h2, m2] = newUser?.sleep ? newUser?.sleep.split(":") : [0,0];
        h2 = Number(h2);
        m2 = Number(m2);
        
        let wakeH =  h1 + m1/60;
        let sleepH = h2 + m2/60;

        let result = sleepH < wakeH ? wakeH - sleepH : wakeH + 24 - sleepH;
        result *= 100;

        return `${Math.round(result)/100}`;
    }

    const handleScheduleChange = (e) => {
        handleSchedule(e.target.parentElement.parentElement.dataset.id, e.target.name, e.target.value);
        setInputsErrors(prev => ({...prev, schedule: null}));
    }

    const handleScheduleToogle = () => {
        handleChangeManual("isScheduleSkipped", !isScheduleSkipped);
        setIsScheduleSkipped(prev => !prev);
        setInputsErrors(prev => ({...prev, schedule: null}));
    }

    const getValue = (index, name) => {
        for(let i of schedule){
            if(i.index == index){
                return i[name];
            }
        }

        return "";
    }

    return(
        <div className="flex flex-col gap-3 w-full overflow-hidden overflow-y-auto pr-3">
            <div className="flex justify-between">
                <h2>Plan lekcji:</h2> 
                 <StyledCheckbox label="Pomiń dodanie planu lekcji" checked={isScheduleSkipped} onChange={handleScheduleToogle}/>
            </div>
            <div className={(isScheduleSkipped ? disabledScheduleClasses : "") + "overflow-x-scroll h-fit"}>
                <table className={(isScheduleSkipped ? "" : inputsErrors.schedule != null ? "error" : "") + " w-[700px] md:w-full"}>
                    <thead>
                        <tr>
                            <th>Godzina</th>
                            <th>Poniedziałek</th>
                            <th>Wtorek</th>
                            <th>Środa</th>
                            <th>Czwartek</th>
                            <th>Piątek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...Array(numOfRow)].map((_, i) => (
                                <tr key={i} data-id={i}>
                                    <td className="flex flex-col md:flex-row">
                                        <input type="time" name="start" className="scheduleInput" onChange={handleScheduleChange}/>
                                        <input type="time" name="end" className="scheduleInput" onChange={handleScheduleChange}/>
                                    </td>
                                    <td><input type="text" name="monday" className="scheduleInput" onChange={handleScheduleChange}/></td>
                                    <td><input type="text" name="tuesday" className="scheduleInput" onChange={handleScheduleChange}/></td>
                                    <td><input type="text" name="wednesday" className="scheduleInput" onChange={handleScheduleChange}/></td>
                                    <td><input type="text" name="thursday" className="scheduleInput" onChange={handleScheduleChange}/></td>
                                    <td><input type="text" name="friday" className="scheduleInput" onChange={handleScheduleChange}/></td>
                                </tr>
                            ))
                        }

                        <tr>
                            <td colSpan={6} className="addingRow" onClick={addRow}>Dodaj wiersz +</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Sen:</h2>
                <div className="flex flex-col lg:flex-row justify-between mt-1 w-full">
                    <div className="w-full lg:flex-2 flex lg:flex-col gap-1 lg:gap-5">
                        <StyledInput type="time" label="Wstawanie" name="wake" onChange={handleChange} value={newUser?.wake} valid={inputsErrors.wake === null}/>
                        <StyledInput type="time" label="Zasypianie" name="sleep" onChange={handleChange} value={newUser?.sleep} valid={inputsErrors.sleep === null}/>
                    </div>
                    <div className="my-5 lg:my-0 w-full lg:flex-3 flex justify-around lg:gap-3 items-center text-center">
                        <div className="text-indigo-400 w-fit">
                            <p className="">Zalecany czas snu:</p>
                            <h4 className="text-3xl sm:text-4xl lg:text-6xl">8h-10h</h4>
                        </div>
                        <div className="text-amber-200 w-fit">
                            <p className="">Twój czas snu:</p>
                            <h4 className="text-3xl sm:text-4xl lg:text-6xl">{getLengthOfSleep()}h</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lifestyle;