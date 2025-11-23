import { useEffect, useState, useRef } from "react";
import CalendarEvent from "./CalendarEvent";
import Pointer from "./Pointer";
import GroupedEvents from "./GroupedEvents";

const SingleDayCalendar = ({user, events, fetchEvents, formatDateForInput, classTw = "", classesInside = ""}) => {
    const [date, setDate] = useState(new Date());
    const pointerRef = useRef(null);

    useEffect(()=>{
        if(user === null) return;
    }, [user])

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
                console.log(user?.email);
                await fetchEvents(user.email, date);
            } catch (err) {
                console.log("Błąd serwera.");
            }
        })();
    }, []);

    useEffect(()=>{

        try{
            (async()=>{await fetchEvents(user.email, date)})();
        } catch(err){
            console.log("Błąd serwera.");
        }
    }, [date]);



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
    <div className={`min-w-fit w-full lg:w-3/5 lg:max-w-[700px] shadow-lg shadow-gray-800 rounded-2xl overflow-hidden ${classTw}`}>
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
        <div className={`h-[500px] overflow-auto z-100 p-5 pb-2 bg-gray-800 w-full ${classesInside}`}>
            <div className={`relative w-full h-[1440px] bg-gray-800 grid grid-rows-[repeat(24,60px)]`}>
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="border-t border-gray-400 text-xs text-gray-400 pl-1 pt-0.5">
                        {i}:00
                    </div>
                ))}
                <div className="absolute w-full h-[1440px] z-50 flex justify-center ml-5">
                    <div className="relative w-4/5">
                        {
                            events.map((group, index) => (
                                <GroupedEvents
                                    key={index}
                                    group={group}
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
