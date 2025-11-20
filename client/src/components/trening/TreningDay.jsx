import { useState } from "react";
import StyledCheckbox from "../inputs/StyledCheckbox";
import "./TreningDay.css"

const TreningDay = ({day, type, exercises}) => {

    const [isDone, setIsDone] = useState(false);

    const changeIsDone = () => {
        setIsDone(!isDone);
    }

    return(
        <div className={`w-90 h-180 bg-gray-800 rounded-xl flex flex-col text-[15px] border-5 ${isDone ? "border-emerald-400" : "border-gray-900"} trening`}>
            <div className="flex border-b border-b-emerald-500 py-5">
                <div className="flex-1"></div>
                <h4 className="text-2xl text-emerald-500 text-center flex-5">{day}</h4>
                <StyledCheckbox classTw={"flex-1"} onChange={changeIsDone}/>
            </div>
            <div className="py-5 border-b border-b-emerald-500 bg-emerald-500">
                <h2 className="text-center text-5xl text-gray-900 ">{type}</h2>
            </div>
            <div className="h-160 overflow-auto">
                <table>
                    <thead>
                        <tr>
                            <th className="w-1/2">Ćwiczenie</th>
                            <th className="w-1/8">Ilość serii</th>
                            <th className="w-1/8">Powtórzenia<br/>Długość</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            exercises.map((value, index) => (
                                <tr key={index}>
                                    <td>{value[0]}</td>
                                    <td>{value[1]}</td>
                                    <td>{value[2]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default TreningDay;