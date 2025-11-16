import StyledInput from "../../inputs/StyledInput";
import StyledButton from "../../buttons/StyledButton";
import StyledCheckbox from "../../inputs/StyledCheckbox";
import { useEffect, useState, useContext } from "react";
import { SignupContext } from "../SignUp";
import "./Lifestyle.css";

const Lifestyle = () => {

    const { handleChange, userData, handleSchedule, schedule } = useContext(SignupContext);


    const [numOfRow, setNumOfRows] = useState(6);
    const [isScheduleSkipped, setIsScheduleSkipped] = useState(false)

    const disabledScheduleClasses = "pointer-events-none select-none opacity-60 font-italic italic";

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

    },[numOfRow])

    const getLengthOfSleep = () => {
        if(userData.sleep == "" || userData.wake == ""){
            return "...";
        }

        let [h1, m1] = userData.wake.split(":");
        h1 = Number(h1);
        m1 = Number(m1);
        let [h2, m2] = userData.sleep.split(":");
        h2 = Number(h2);
        m2 = Number(m2);
        
        let wakeH =  h1 + m1/60;
        let sleepH = h2 + m2/60;

        let result = sleepH < wakeH ? wakeH - sleepH : wakeH + 24 - sleepH;
        result *= 100;

        return `${Math.round(result)/100}h`;
    }

    const handleScheduleChange = (e) => {
        handleSchedule(e.target.parentElement.parentElement.dataset.id, e.target.name, e.target.value);
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
        <div className="flex flex-col gap-3 h-[525px] overflow-auto pr-3">
            <div className="flex justify-between">
                <h2>Plan lekcji:</h2> 
                 <StyledCheckbox label="Pomiń dodanie planu lekcji" checked={isScheduleSkipped} onChange={() => setIsScheduleSkipped(prev => !prev)}/>
            </div>
            <div className={isScheduleSkipped ? disabledScheduleClasses : ""}>
                <table>
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
                                    <td className="flex">
                                        <input type="time" name="start" className="scheduleInput" onChange={handleScheduleChange}/>
                                        <em><sub>-</sub></em>
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
                <div className="flex flex-row justify-between mt-1">
                    <div className="w-2/5 flex flex-col gap-5">
                        <StyledInput type="time" label="Wstawanie" name="wake" onChange={handleChange} value={userData.wake}/>
                        <StyledInput type="time" label="Zasypianie" name="sleep" onChange={handleChange} value={userData.sleep}/>
                    </div>
                    <div className="w-fit grid grid-cols-2 gap-3 items-center text-center">
                        <div className="text-indigo-400">
                            <p className="">Zalecany czas snu:</p>
                            <h4 className="text-6xl">8h-10h</h4>
                        </div>
                        <div className="text-amber-200">
                            <p className="">Twój czas snu:</p>
                            <h4 className="text-6xl">{getLengthOfSleep()}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default Lifestyle;