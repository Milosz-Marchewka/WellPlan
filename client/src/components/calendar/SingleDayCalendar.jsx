import { useState } from "react";
import CalendarEvent from "./CalendarEvent";
import Pointer from "./Pointer";

function SingleDayCalendar() {
    const [date, setDate] = useState(new Date());

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

    function generateAxis(){

    }

  return (
    <div>
        <div>
            <button onClick={() => previousDay()}>left</button>
            <input
                type="date"
                value={formatDateForInput(date)}
                onChange={(e) => setDate(new Date(e.target.value))}
            />
            <button onClick={() => nextDay()}>right</button>
        </div>
        <div className="w-110 h-[500px] bg-gray-300 overflow-auto z-100 p-5 bg-gray-800 rounded-2xl">
            <div className="relative w-full h-[1440px] bg-gray-800 grid grid-rows-[repeat(24,60px)]">
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="border-t border-white text-xs text-white pl-1">
                        {i}:00
                    </div>
                ))}
                <div className="absolute w-100 h-[1440px] z-50">
                    <CalendarEvent title="Matematyka" start={{hh: 10, mm: 10}} end={{hh: 10, mm: 55}} color="cyan" />
                    <CalendarEvent title="Niemiecki" start={{hh: 11, mm: 10}} end={{hh: 11, mm: 55}} color="yellow" />
                    <CalendarEvent title="J. Polski" start={{hh: 12, mm: 10}} end={{hh: 13, mm: 45}} color="crimson" />
                    <CalendarEvent title="Geografia" start={{hh: 14, mm: 0}} end={{hh: 14, mm: 45}} color="brown" />
                    <CalendarEvent title="Obiad🍴" start={{hh: 16, mm: 0}} end={{hh: 16, mm: 30}} color="chocolate" />
                    <CalendarEvent title="Trening💪" start={{hh: 17, mm: 30}} end={{hh: 18, mm: 45}} color="dimGray" />
                    <CalendarEvent title="Idziemy spac💤" start={{hh: 22, mm: 30}} end={{hh: 23, mm: 0}} color="skyBlue" />
                    <Pointer now={{hh: date.getHours(), mm: date.getMinutes()}}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SingleDayCalendar;
