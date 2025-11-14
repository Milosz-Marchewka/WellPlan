import { useEffect, useState, useRef } from "react";
import CalendarEvent from "./CalendarEvent";
import Pointer from "./Pointer";

const formatDateForInput = (date)=>{
    return date.toISOString().split("T")[0];
}


function SingleDayCalendar() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const pointerRef = useRef(null);

    // empty [] - runs once (componentDidMount) - pull initial data + scroll into view
    // if you're wondering what magic is (async()=>{})() go google IIFE JS :D
    useEffect(() => {
        (async () => {
            if (pointerRef.current) {
            pointerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            }

            try {
            const event = await fetchEvents("activities@test.pl", new Date());
            setEvents(event);
            } catch (err) {
                console.log("Błąd serwera.");
            }
        })();
    }, []);

    useEffect(()=>{
        console.log("DebugText: useeffect calendar");
        if(date.toDateString() === new Date().toDateString()){
            // event
            // {
            //     'year-month-day': {
            //         name,
            //         start,
            //         end
            //     }
            // }
        }
    }, [date]);

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
                return [];
            }
            const res = await req.json();
            return res || [];
        } catch(err){
            console.log("Błąd serwera.");
            return [];
        }
    }


    function previousDay() {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    }

    function nextDay() {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    }

  return (
    <div className="min-w-fit w-2/5 shadow-lg shadow-gray-800 rounded-2xl overflow-hidden">
        <div className="bg-gray-900 text-emerald-400 flex justify-around h-20 text-xl">
            <button onClick={() => previousDay()}>&lt;</button>
            <input
                type="date"
                value={formatDateForInput(date)}
                className="w-fit"
                onChange={(e) => setDate(new Date(e.target.value))}
            />
            <button onClick={() => nextDay()}>&gt;</button>
        </div>
        <div className="h-[500px] overflow-auto z-100 p-5 pb-2 bg-gray-800 w-full">
            <div className="relative w-full h-[1440px] bg-gray-800 grid grid-rows-[repeat(24,60px)]">
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="border-t border-gray-400 text-xs text-gray-400 pl-1 pt-0.5">
                        {i}:00
                    </div>
                ))}
                <div className="absolute w-full h-[1440px] z-50 flex justify-center ml-5">
                    <div className="relative w-3/4">
                        {
                            events &&
                            events.map((event, index) => (
                                <CalendarEvent 
                                    key={index}
                                    title={event.name} 
                                    start={event.start} 
                                    end={event.end} 
                                    color={"red"} 
                                />
                            ))
                        }
                        {/* <CalendarEvent key={1} title="a" start={{hh: 2, mm: 2}} end={{hh: 2, mm: 2}} color="cyan" /> */}
                        <Pointer ref={pointerRef} now={{hh: date.getHours(), mm: date.getMinutes()}}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SingleDayCalendar;
