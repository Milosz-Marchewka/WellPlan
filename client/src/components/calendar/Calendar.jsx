import SingleDayCalendar from "./SingleDayCalendar";
import AddCalendarEvent from "./AddCalendarEvent";

const Calendar = ()=>{
    return(
        
        <div className="flex justify-center w-full min-h-screen items-center  gap-20">
            <SingleDayCalendar />
            <AddCalendarEvent />
        </div>
    );
}

export default Calendar;