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

const Home = ({user})=>{
    const [events, setEvents] = useState([]);
    const [groupEvents, setGroupEvents] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(()=>{
            if(user === null) return;
        }, [user])
    
    useEffect(() => {
        if (!events || events.length === 0){
            setGroupEvents([]);
            return;
        }

        if(events == []){
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
                console.log("Błąd pobierania danych.");
                setEvents([]);
            }
            const res = await req.json();
            console.log("res", res);
            setEvents(res || []);
        } catch(err){
            console.log("Błąd serwera.");
            setEvents([]);
        }
    }
    

    return(
        <div className="w-full min-h-screen">
            <div className="w-fit h-fit px-15 pt-2 pb-6 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Ekran główny</h1>
            </div>
                
            <div className="w-full px-5 flex flex-col xl:grid xl:grid-cols-1 gap-5 gap-x-15 xl:mx-auto items-center xl:max-w-[1200px]">
                <div className="w-full" >
                    <Statistic/>
                </div>
                <div className="w-full lg:col-start-1 lg:row-start-2 xl:min-w-[550px] flex justify-center">
                    <SingleDayCalendar user={user} events={groupEvents} fetchEvents={fetchEvents} formatDateForInput={formatDateForInput} classTw="lg:w-full" classesInside="md:h-[450px]"/>
                </div>
                <div className="lg:row-span-2 lg:col-start-2 lg:row-start-1">
                    <TreningDay 
                    day="Poniedziałek" 
                    type="Push" 
                    exercises={[
                        ["Wyciskanie sztangi na ławce poziomej", 4, "6–8"],
                        ["Wyciskanie hantli na skosie dodatnim", 3, "8–10"],
                        ["Pompki na poręczach (dipy)", 3, "6–10"],
                        ["Wyciskanie sztangi nad głowę (OHP)", 4, "5–8"],
                        ["Unoszenie hantli bokiem", 3, "12–15"],
                        ["Prostowanie ramion na wyciągu (triceps)", 3, "10–12"]
                    ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;