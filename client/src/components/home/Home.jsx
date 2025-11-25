import { useEffect, useState } from "react";
import SingleDayCalendar from "../calendar/SingleDayCalendar";
import Statistic from "../nutrition/Statistic";
import TreningDay from "../trening/TreningDay";

const formatDateForInput = (date)=>{
    return date.toISOString().split("T")[0];
}

const formatTimeToMinutes = (time)=>{
    return Number(time?.split(":")[0]) * 60 + Number(time?.split(":")[1]);
}

const getDateForTraining = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

const Home = ({user, eaten, setEaten, fetchEaten})=>{
    const [events, setEvents] = useState([]);
    const [groupEvents, setGroupEvents] = useState([]);
    const [date, setDate] = useState(new Date());
    const [calendarLog, setCalendarLog] = useState({level: "", message: ""});
    const [trainingLog, setTrainingLog] = useState({level: "", message: ""});
    const [todayTrening, setTodayTrening] = useState({});

    useEffect(()=>{
            if(user === null) return;
            (async()=>{
                setTodayTrening(await fetchTraining(user?.email));
            })();
    }, [user])

    useEffect(() => {
        if (!events || events.length === 0){
            setGroupEvents([]);
            return;
        }

        if(events.length > 0){
            events.sort((a, b) => {
                return formatTimeToMinutes(a.start) - formatTimeToMinutes(b.start);
            });
        }

        const groups = [];
        let currentGroup = [events[0]];
        let currentEnd = formatTimeToMinutes(events[0]?.end);

        for (let i = 1; i < events.length; i++) {
            const start = formatTimeToMinutes(events[i]?.start);
            console.log(events[i]);
            
            if (start <= currentEnd) {
                currentGroup.push(events[i]);
                const thisEnd = formatTimeToMinutes(events[i]?.end);
                currentEnd = Math.max(currentEnd, thisEnd);
            } else {
                groups.push(currentGroup);
                currentGroup = [events[i]];
                currentEnd = formatTimeToMinutes(events[i]?.end);
            }
        }
        groups.push(currentGroup);
        setGroupEvents(groups);
        
    }, [events]);


    const fetchEvents = async (email, date)=>{
        try{
            const formatted = formatDateForInput(date);
            const req = await fetch(`http://localhost:5000/calendar/get?email=${email}&date=${formatted}`, {
                method: "GET",
                headers:{
                    "Accept": "application/json"
                }
            });
            if(!req.ok){
                setCalendarLog({level: "error", message: "Błąd serwera"});
                setEvents([]);
            }
            const res = await req.json();
            setCalendarLog({level: "", message: ""});
            console.log("res", res);
            setEvents(res || []);
        } catch(err){
            console.log("Błąd serwera.");
            setCalendarLog({level: "error", message: "Błąd serwera"});
            setEvents([]);
        }
    }

    const fetchTraining = async (email)=>{
        let training;
        const days = ['_', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        try{
            const req = await fetch(`http://localhost:5000/training/get?email=${email}`, {
                method: "GET"
            })

            if(!req.ok){
                setTrainingLog({level: "error", message: "Błąd serwera"});
                return {};
            } 

            setTrainingLog({level: "", message: ""});
            training = await req.json();
            console.log(training);
            for(let i in training){
                if(i.toLocaleLowerCase() == getDateForTraining().toLocaleLowerCase()){
                    console.log(training[i]);
                    return training[i][0];
                }
            }
            setTodayTrening({});
        } catch(e){
            setTrainingLog({level: "error", message: "Błąd serwera"});
            return {};
        }

        for(const key in training){
            // tylko 0 index z tego dnia
            if(key === days[new Date().getDay() || -1]) return training[key][0];
        }

        return {};
    }
    

    return(
        <div className="w-full min-h-screen">
            <div className="w-fit h-fit px-15 pt-2 pb-6 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Ekran główny</h1>
            </div>
                
            <div className="w-full px-5 flex flex-col xl:grid xl:grid-cols-1 gap-5 gap-x-15 xl:mx-auto items-center xl:max-w-[1200px]">
                <div className="w-full" >
                    <Statistic user={user} eaten={eaten} setEaten={setEaten} fetchEaten={fetchEaten}/>
                </div>
                <div className="w-full lg:col-start-1 lg:row-start-2 xl:min-w-[550px] flex justify-center">
                    <SingleDayCalendar selectedDate={null} user={user} events={groupEvents} fetchEvents={fetchEvents} formatDateForInput={formatDateForInput} classTw="lg:w-full" classesInside="md:h-[450px]" propLog={calendarLog}/>
                </div>
                <div className="lg:row-span-2 lg:col-start-2 lg:row-start-1">
                    {
                        !todayTrening?.type ?
                        <div className="w-90 h-180 bg-gray-800 rounded-xl flex flex-col text-[15px] border-5 flex justify-center items-center">
                            {
                                trainingLog.level == "error" ?
                                <h1 className="text-4xl text-center text-red-400">{trainingLog.message}</h1>
                                :
                                <h1 className="text-4xl text-center text-gray-300">Brak treningu w dzisiejszym dniu</h1>
                            }
                        </div>
                        :
                        <TreningDay 
                        day="Dzisiaj" 
                        type={todayTrening.type} 
                        exercises={todayTrening.plan}
                        />

                    }
                </div>
            </div>
        </div>
    );
}

export default Home;