
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
 
    const classes = "text-center left-0 w-full rounded-xs";

    const styles = {
        top: getTopMinutes(start),
        height: getHeight(start, end),
        backgroundColor: color,
        marginTop: (getTopMinutes(start) - offset)
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