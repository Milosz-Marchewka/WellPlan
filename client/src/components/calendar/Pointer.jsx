import { forwardRef } from "react";

const Pointer = forwardRef(({ now }, ref) => {

    let styles = {
        top: getTopMinutes(now),
    }

    function getTopMinutes(time){
        return time.hh * 60 + time.mm;
    }

    return(
        <div ref={ref} className="w-full bg-emerald-500 h-0.5 absolute" style={styles}></div>
    );

});

export default Pointer;