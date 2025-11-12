import SingleDayCalendar from "./SingleDayCalendar";
import AddCalendarEvent from "./AddCalendarEvent";

const Calendar = ()=>{
    return(
        <div className="p-10 flex justify-around w-full">
            <SingleDayCalendar />
            <AddCalendarEvent />
        </div>
    );
}

export default Calendar;