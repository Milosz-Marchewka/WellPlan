import { useEffect, useState } from "react";
import PersonalInformations from "./SignUpPanels/PersonalInformations";
import BodyMeasurements from "./SignUpPanels/BodyMeasurements";
import Lifestyle from "./SignUpPanels/Lifestyle";
import StyledButton from "../buttons/StyledButton";
import Person from "../../assets/icons/signForm/person.png";
import Dumbell from "../../assets/icons/signForm/dumbell.png";

function SignUp(){

    const [progress, setProgress] = useState(0);

    useEffect(()=>{
        
    }, [progress])

    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        gender: "male",
        age: null,
        activityLevel: null,
        height: null,
        weight: null,
        wake: "",
        sleep: "",
    });

    const [tempSchedule, setTempSchedule] = useState([]);

    const handleTempSchedule = (index, name, value) => {
        let temp = tempSchedule;
        for(let i = 0; i < temp.length; i++){
            if(temp[i].index == Number(index)){
                temp[i][name] = value;
                setTempSchedule(prev => temp);
                console.log(temp);
                return;
            }
        }
        temp.push({index: Number(index), start: "", end: "", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", [name]: value});

        console.log(temp);
        setTempSchedule(prev => temp);
    }

    const tempScheduleToNormalSchedule = () => {
        let temp = tempSchedule;
        temp.sort((a, b) => {
            const [hh1, mm1] = a.start.split(":").map(Number);
            const [hh2, mm2] = b.start.split(":").map(Number);
            
            const minutesA = hh1 * 60 + mm1;
            const minutesB = hh2 * 60 + mm2;
            
            return minutesA - minutesB;
        }); 

        let result = {};
        result.monday = [];
        result.tuesday = [];
        result.wednesday = [];
        result.thursday = [];
        result.friday = [];

        for(let i of temp){
            for(let j of ["monday", "tuesday", "wednesday", "thursday", "friday"]){
                if(i[j] != ""){
                    result[j].push({name: i[j],  start: i.start, end: i.end});
                }
            }
        }
        console.log(result);
    }

    const handleChange = (e) => {
        setUserData(prev => ({...prev, [e.target.name]: e.target.value}));
        console.log("DebugText: ", userData);
    }

    const handleChangeManual = (name, value) => {
        setUserData(prev => ({...prev, [name]: value}));
        console.log("DebugText: ", userData);
    }

    const nextStage = () => {
        setProgress(p => p+1);
    }

    const prevStage = () => {
        setProgress(p => p-1);
    }

    return(
        <div className="flex w-screen min-h-screen items-center justify-center flex-col py-10 gap-10">
            <div className="flex w-[800px] max-w-3/4 rounded-lg shadow-lg shadow-gray-800 overflow-hidden">
                <div className="flex-3 flex flex-col bg-gray-800 text-white w-1/4 min-w-sm p-10 h-[720px]">
                    <h2 className="text-emerald-400 text-3xl">Rejestracja</h2>
                    <div className="my-5 flex flex-col gap-2">
                        {
                            (progress == 0 ?
                            <PersonalInformations onChange={handleChange} onChangeManual={handleChangeManual} userData={userData}/>
                            :
                            (progress == 1 ?
                            <BodyMeasurements onChange={handleChange} onChangeManual={handleChangeManual} userData={userData}/>
                            :
                            <Lifestyle onChange={handleChange} onChangeManual={handleChangeManual} userData={userData} handleSchedule={handleTempSchedule} schedule={tempSchedule}/>))
                        }
                    </div>
                    <div className="mt-auto flex justify-between">
                        {
                            progress == 0 ? 
                            <div></div>
                            :
                            <StyledButton text="Wstesz" click={prevStage}/>
                        }
                        {
                            progress == 2 ?
                            <StyledButton text="Zarejestuj się" click={()=> console.log("Koniec")} />
                            :
                            <StyledButton text="Dalej" click={nextStage} />
                        }
                    </div>
                </div>
                {
                    progress !== 2 ?
                    <div className="flex-2 bg-emerald-600 flex items-center justify-center">
                        <img src={progress == 0 ? Person : Dumbell} alt="" className="w-2/3 filter brightness-10" />
                    </div>
                    :
                    ""
                }
            </div>
        </div>
    );
}

export default SignUp;
