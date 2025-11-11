import { useEffect } from "react";


function CalendarEvent({title, start, end, color}){
 
    let classes = "absolute left-20 w-70 rounded-lg p-1";

    let styles = {
        top: getTopMinutes(start),
        height: getHeight(start, end),
        backgroundColor: color
    }

    function getTopMinutes(time){
        return time.hh * 60 + time.mm;
    }

    function getHeight(time1, time2){
        return getTopMinutes(time2) - getTopMinutes(time1); 
    }

    return(
        <div className={classes} style={styles}>
            <h6>{title}</h6>
        </div>
    );
}

export default CalendarEvent;