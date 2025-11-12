import { useEffect, useState } from "react";


function CalendarEvent({title, start, end, color}){
 
    let classes = "text-center absolute left-30 w-70 rounded-xs";

    let styles = {
        top: getTopMinutes(start),
        height: getHeight(start, end),
        backgroundColor: color
    }
    
    function getTopMinutes(time){
        return time.hh * 60 + time.mm;
    }

    function getHeight(time1, time2){
        let h = getTopMinutes(time2) - getTopMinutes(time1);
        return h == 0 ? 1 : h; 
    }

    function getStyleForH6(){
        let h = getHeight(start, end);
        if(h < 24){
            return {backgroundColor: color, transform: `translateY(-${12 - h/2}px)`}
        }else{
            return {backgroundColor: color}
        }
    }

    return(
        <div className={classes} style={styles}>
                {
                (getHeight(start, end) < 25) ?
                <h6 className="text-center inline-block px-4 rounded-xs" style={getStyleForH6()}>{title}</h6>
                :
                <h6 className="text-center inline-block px-4 rounded-xs">{title}</h6>
                }
        </div>
    );
}

export default CalendarEvent;