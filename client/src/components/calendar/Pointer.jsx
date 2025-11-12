

function Pointer({now}){

    let styles = {
        top: getTopMinutes(now),
    }

    function getTopMinutes(time){
        return time.hh * 60 + time.mm;
    }

    return(
        <div className="w-full bg-emerald-500 h-0.5 absolute" style={styles}></div>
    );

}

export default Pointer;