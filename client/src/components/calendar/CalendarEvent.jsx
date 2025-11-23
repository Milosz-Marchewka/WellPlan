import { useState } from "react";
import "./CalendarEvent.css"

const CalendarEvent = ({title, start, end, color, offset})=>{

    const getTopMinutes = (time)=>{
        return Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]);
    }

    const getHeight = (time1, time2)=>{
        const h = getTopMinutes(time2) - getTopMinutes(time1);
        return h == 0 ? 1 : h; 
    }

    const getStyleForH6 = ()=>{
        const h = getHeight(start, end);
        if(h < 24){
            return {backgroundColor: color, transform: `translateY(-${12 - h/2}px)`}
        }else{
            return {backgroundColor: color}
        }
    }
 
    const classes = "event-div text-center left-0 w-full rounded-xs cursor-pointer flex justify-center items-start";

    const styles = {
        top: getTopMinutes(start),
        height: getHeight(start, end),
        backgroundColor: color,
        marginTop: (getTopMinutes(start) - offset)
    }

    const [isStartEqualEnd, _] = useState(start == end); 

    return(
        <>
            <div className={classes} style={styles}>
                    {
                    (getHeight(start, end) < 25) ?
                    <h6 className="event-div text-center inline-block px-4 rounded-xs relative w-fit whitespace-nowrap" style={getStyleForH6()}>
                        {title}
                        <p className={`${isStartEqualEnd ? "w-15" : "w-30"} absolute text-center top-[30px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black italic z-200 rounded-lg`} style={{backgroundColor: color}}>{isStartEqualEnd ? start : `${start} - ${end}`}</p>
                    </h6>
                    :
                    <h6 className="event-div text-center inline-block px-4 rounded-xs relative">
                        <p className="w-30 absolute text-center top-[33px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black italic z-200 rounded-lg" style={{backgroundColor: color}}>{start} - {end}</p>
                        {title}
                    </h6>
                    }
            </div>
    
        </>
    );
}

export default CalendarEvent;