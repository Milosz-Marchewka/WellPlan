import { useEffect, useState, createContext, use } from "react";
import { Outlet, Link } from "react-router-dom";
import PersonalInformations from "./SignUpPanels/PersonalInformations";
import BodyMeasurements from "./SignUpPanels/BodyMeasurements";
import Lifestyle from "./SignUpPanels/Lifestyle";
import StyledButton from "../buttons/StyledButton";
import Person from "../../assets/icons/signForm/person.png";
import Dumbell from "../../assets/icons/signForm/dumbell.png";
import Disclaimer from "../disclaimer/Disclaimer";

export const SignupContext = createContext();

const urls = ["/", "/bodyMeasurements", "/lifestyle"];

const SignUp = ({user, setUser, navigate}) => {
    const [schedule, setSchedule] = useState([]);
    const [progress, setProgress] = useState(0);
    const [canProgress, setCanProgress] = useState(()=>()=>false);
    const [log, setLog] = useState({level: "", message: "dadada"});
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        age: null,
        gender: "male",
        height: null,
        weight: null,
        activityLevel: 0,
        wake: null,
        sleep: null,
        isScheduleSkipped: false,
    });

    useEffect(()=>{
        if(user != null){
            navigate("/");
        }
    }, []);

    useEffect(()=>{
        navigate(`/signup${urls[progress]}`);
    }, [progress]);


    const handleSchedule = (index, name, value) => {
        let temp = schedule;
        for(let i = 0; i < temp.length; i++){
            if(temp[i].index == Number(index)){
                temp[i][name] = value;
                setSchedule(prev => temp);
                console.log(temp);
                return;
            }
        }
        temp.push({index: Number(index), start: "", end: "", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", [name]: value});

        console.log(temp);
        setSchedule(prev => temp);
    }

    const scheduleToNormalSchedule = () => {
        let temp = schedule;
        temp.sort((a, b) => {
            const [hh1, mm1] = a.start.split(":").map(Number);
            const [hh2, mm2] = b.start.split(":").map(Number);
            
            const minutesA = hh1 * 60 + mm1;
            const minutesB = hh2 * 60 + mm2;
            
            return minutesA - minutesB;
        }); 

        const result = {};
        result.monday = [];
        result.tuesday = [];
        result.wednesday = [];
        result.thursday = [];
        result.friday = [];

        for(let i of temp){
            for(let j of ["monday", "tuesday", "wednesday", "thursday", "friday"]){
                if(i[j] != ""){
                    result[j].push({name: i[j],  start: i.start, end: i.end, color: "AliceBlue"});
                }
            }
        }
        return result;
    }

    const handleChange = (e) => {
        setNewUser(prev => ({...prev, [e.target.name]: e.target.value}));
        console.log("DebugText: ", newUser);
    }

    const handleChangeManual = (name, value) => {
        setNewUser(prev => ({...prev, [name]: value}));
        console.log("DebugText: ", newUser);
    }

    const nextStage = () => {
        console.log("Hi?", canProgress());
        if(canProgress()){
            setProgress(p => p+1);
        };
    }

    const register = () => {
        if(!canProgress()){
            return;
        }
        // console.log("Dane nowego uzytkownika:")
        // console.log(newUser);
        // console.log(schedule);//Tymczasowy Schedule, nie używasz tego do backendu.
        // console.log(scheduleToNormalSchedule(schedule));//To używasz do backednu, pamiętaj by najpierw sprawdzić czy newUser.isScheduleSkipped bo pod tym warunkiem zapisujesz plan lekcji
        (async()=>{
            await addUser();
        })();
    }

    const addUser = async()=>{
        const {isScheduleSkipped, ...postUser} = newUser;
        const body = {
            ...postUser,
            ...(!isScheduleSkipped && {schedule: scheduleToNormalSchedule(schedule)})
        }
        console.log("BODY: ", body);
        console.log(isScheduleSkipped, scheduleToNormalSchedule(schedule));
        try{
            console.log('a');
            const req = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(body)
            });
            console.log('b');
            if(!req.ok){
                console.log(await req.text());
                return;
            }
            console.log('c');
            
            const res = await req.json();
            console.log("RES:", res);
            setUser(res);
            navigate("/");
        } catch(e){
            setLog({level: "error", message: "Błąd serwera"});
        }
    }

    const prevStage = () => {
        setProgress(p => p-1);
    }

    return(
        <SignupContext.Provider value={{handleChange, handleChangeManual, newUser, handleSchedule, schedule, setCanProgress}}>
            <div className="flex w-screen min-h-screen justify-center items-center px-1 py-10 sm:px-5 md:py-10">
                <div className="flex w-full lg:w-[800px] lg:max-w-3/4 rounded-lg shadow-lg shadow-gray-800 overflow-hidden mb-40 sm:mb-20">
                {
                    log.level == "error" ?
                    <div className="w-full py-5 px-1 flex-3 flex flex-col bg-gray-800 text-white sm:p-5 sm:py-10 lg:p-10 h-fit">
                        <h1 className="text-red-400 text-4xl">Błąd:</h1>
                        <h2 className="text-red-400 text-2xl">Nie można zarejstrować użytkownika: {log.message}</h2>
                        <Link to="/login" className="pt-2 text-emerald-400 hover:underline ml-1" onClick={()=>setUser(null)}>
                            Wróć do logowania
                        </Link>
                    </div>
                    :
                    <>
                        <div className="w-full py-5 px-1 flex-3 flex flex-col bg-gray-800 text-white sm:p-5 sm:py-10 lg:p-10 h-fit">
                            <h2 className="text-emerald-400 text-3xl">Rejestracja</h2>
                            <div className="my-5 flex flex-col gap-2">
                                {
                                    <Outlet/>
                                }
                            </div>
                            <div className="mt-auto flex justify-between">
                                {
                                    progress == 0 ? 
                                    <Link to="/login" className="pt-2 text-emerald-400 hover:underline ml-1" onClick={()=>setUser(null)}>
                                        Wróć do logowania
                                    </Link>
                                    :
                                    <StyledButton text="Wstesz" click={prevStage}/>
                                }
                                {
                                    progress == 2 ?
                                    <StyledButton text="Zarejestuj się" click={register} />
                                    :
                                    <StyledButton text="Dalej" click={nextStage} />
                                }
                            </div>
                        </div>
                        {
                            progress !== 2 ?
                            <div className="hidden flex-2 bg-emerald-600 md:flex items-center justify-center ">
                                <img src={progress == 0 ? Person : Dumbell} alt="" className="w-2/3 filter brightness-10" />
                            </div>
                            :
                            ""
                        }
                    </>
                }
                </div>
                <Disclaimer/>
            </div>
        </SignupContext.Provider>
    );
}

export default SignUp;
