import { useEffect, useState } from "react";
import SingleDayCalendar from "./SingleDayCalendar";
import AddCalendarEvent from "./AddCalendarEvent";

const formatDateForInput = (date)=>{
    return date.toISOString().split("T")[0];
}

const formatTimeToMinutes = (time)=>{
    return Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]);
}


const Calendar = ({user})=>{
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
        let currentEnd = formatTimeToMinutes(events[0].end);

        for (let i = 1; i < events.length; i++) {
            const start = formatTimeToMinutes(events[i].start);
            console.log(events[i]);
            
            if (start <= currentEnd) {
                currentGroup.push(events[i]);
                const thisEnd = formatTimeToMinutes(events[i].end);
                currentEnd = Math.max(currentEnd, thisEnd);
            } else {
                groups.push(currentGroup);
                currentGroup = [events[i]];
                currentEnd = formatTimeToMinutes(events[i].end);
            }
        }
        groups.push(currentGroup);

        console.log("Ready to go", groups);
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

    // flex justify-center items-start pt-20 gap-20
    return(
        <div>
            <div className="w-fit h-fit px-15 pt-2 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Kalendarz</h1>
                <p className="mb-4 text-gray-200 text-lg">Dodawaj wydarzenia do swojego kalendarza</p>
            </div>
            
            <div className="flex flex-col gap-5 px-5 pb-5 lg:flex-row lg:justify-center lg:items-start lg:pt-20 lg:gap-20">
                <SingleDayCalendar user={user} events={groupEvents} fetchEvents={fetchEvents} formatDateForInput={formatDateForInput}/>
                <AddCalendarEvent user={user} events={events} setEvents={setEvents} fetchEvents={fetchEvents}/>
            </div>
        
        </div>
    );
}

export default Calendar;