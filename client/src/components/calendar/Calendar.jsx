import { useState } from "react";
import SingleDayCalendar from "./SingleDayCalendar";
import AddCalendarEvent from "./AddCalendarEvent";

const formatDateForInput = (date)=>{
    return date.toISOString().split("T")[0];
}

const Calendar = ()=>{
    const [events, setEvents] = useState([]);

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
        <div>
            <div className="w-fit h-fit px-15 pt-2 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Kalendarz</h1>
                <p className="mb-4 text-gray-200 text-lg">Dodawaj wydarzenia do swojego kalendarza</p>
            </div>
            
            <div className="flex justify-center items-start pt-20 gap-20">
                <SingleDayCalendar events={events} fetchEvents={fetchEvents} formatDateForInput={formatDateForInput}/>
                <AddCalendarEvent events={events} setEvents={setEvents} fetchEvents={fetchEvents}/>
            </div>
        
        </div>
    );
}

export default Calendar;