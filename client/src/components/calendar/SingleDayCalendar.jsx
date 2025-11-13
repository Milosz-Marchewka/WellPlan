import { useEffect, useState } from "react";
import CalendarEvent from "./CalendarEvent";
import Pointer from "./Pointer";

function SingleDayCalendar() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
;

    useEffect(()=>{
        console.log("DebugText: useeffect calendar");
        setEvents([]);
        if(date.toDateString() === new Date().toDateString()){
            setEvents([
                {title: "Pobudka", start: {hh: 2, mm: 30}, end: {hh: 2, mm: 35}, color: "ghostwhite"},
                {title: "Matematyka", start: {hh: 10, mm: 10}, end: {hh: 10, mm: 55}, color: "cyan"},
                {title: "J. niemiecki", start: {hh: 11, mm: 10}, end: {hh: 11, mm: 55}, color: "crimson"},
                {title: "J. polski", start: {hh: 12, mm: 10}, end: {hh: 13, mm: 45}, color: "beige"},
                {title: "Geografia", start: {hh: 14, mm: 0}, end: {hh: 14, mm: 45}, color: "chocolate"},
            ]);
        }
    }, [date]);


    function formatDateForInput(date) {
        return date.toISOString().split("T")[0];
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
    <div className="min-w-fit w-2/5">
        <div className="bg-emerald-400 flex justify-around h-20 rounded-t-2xl text-xl">
            <button onClick={() => previousDay()}>&lt;</button>
            <input
                type="date"
                value={formatDateForInput(date)}
                className="w-fit"
                onChange={(e) => setDate(new Date(e.target.value))}
            />
            <button onClick={() => nextDay()}>&gt;</button>
        </div>
        <div className="h-[500px] overflow-auto z-100 p-5 bg-gray-800 rounded-2xl rounded-t-none w-full">
            <div className="relative w-full h-[1440px] bg-gray-800 grid grid-rows-[repeat(24,60px)]">
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="border-t border-white text-xs text-white pl-1">
                        {i}:00
                    </div>
                ))}
                <div className="absolute w-full h-[1440px] z-50 flex justify-center ml-5">
                    <div className="relative w-3/4">
                        {
                            events.map((item, i) => (
                                <CalendarEvent key={i} title={item.title} start={item.start} end={item.end} color={item.color} />
                            ))
                        }
                        {/* <CalendarEvent key={1} title="a" start={{hh: 2, mm: 2}} end={{hh: 2, mm: 2}} color="cyan" /> */}
                    </div>
                    <Pointer now={{hh: date.getHours(), mm: date.getMinutes()}}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SingleDayCalendar;
