import { useEffect } from "react";
import CalendarEvent from "./CalendarEvent";

const GroupedEvents = ({group}) => {

    const getTopMinutes = (time)=>{
        return Number(time?.split(":")[0]) * 60 + Number(time?.split(":")[1]);
    }

    const getHeight = (time1, time2)=>{
        const h = getTopMinutes(time2) - getTopMinutes(time1);
        return h == 0 ? 1 : h; 
    }

    return(
        <div className="absolute flex w-full h-fit gap-1" style={{top: getTopMinutes(group[0]?.start)}}>
            {
                group.map((element, index)=>(
                    <CalendarEvent key={index} title={element?.name} start={element?.start} end={element?.end} color={element?.color} offset={getTopMinutes(group[0]?.start)}/>
                ))
            }
        </div>
    );

}

export default GroupedEvents;