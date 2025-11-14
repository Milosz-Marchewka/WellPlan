import SingleDayCalendar from "./SingleDayCalendar";
import AddCalendarEvent from "./AddCalendarEvent";

const Calendar = ()=>{
    return(
        <div>
            <div className="w-fit h-fit px-15 pt-2 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Kalendarz</h1>
                <p className="mb-4 text-gray-200 text-lg">Dodawaj wydarzenia do swojego kalendarza</p>
            </div>
            
            <div className="flex justify-center items-start pt-20 gap-20">
                <SingleDayCalendar />
                <AddCalendarEvent />
            </div>
        
        </div>
    );
}

export default Calendar;