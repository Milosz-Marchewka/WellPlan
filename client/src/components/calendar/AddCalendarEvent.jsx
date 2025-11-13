import {useState} from "react"
import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";
import StyledCheckbox from "../inputs/StyledCheckbox";

function AddCalendarEvent(){

    const [isStartEqualEnd, setIsStartEqualEnd] = useState(false);

    const [eventData, setEventData] = useState({
        title: "",
        date: new Date().toISOString().split("T")[0],
        start: "",
        end: "",
    });

    function handleChange(e){
        let element = e.target;
        setEventData(prevEventData => ({...prevEventData, [element.name]: element.value}));
        console.log("DebugText: ", eventData);
    }

    function handleCheckboxChange(e){
        if(e.target.checked){
            setIsStartEqualEnd(true);
            setEventData(prevEventData => ({...prevEventData, ["end"]: prevEventData.start}))
        }else{
            setIsStartEqualEnd(false);
        }
    }

    return(
        <div className="text-center h-fit w-1/3">
            <h3 className="w-full bg-emerald-400 text-2xl rounded-t-lg p-5">Dodaj nowe wydarzenie</h3>
            <div className="w-full flex flex-col gap-5 bg-gray-800 rounded-b-lg p-5 ">
                <StyledInput label="Nazwa" name="title" value={eventData.title} onChange={(e) => handleChange(e)}/>
                <StyledInput label="Dzień" name="date" type="date" value={eventData.date} onChange={(e) => handleChange(e)}/>
                <StyledInput label="Rozpoczęcie" name="start" type="time" value={eventData.start} onChange={(e) => handleChange(e)}/>
                <StyledInput label="Zakończenie" name="end" type="time" value={isStartEqualEnd ? eventData.start : eventData.end} disabled={isStartEqualEnd ? true : false} onChange={(e) => handleChange(e)}/>
                <StyledCheckbox label="Taka sama godzina rozpoczęcia i zakończenia" onChange={(e) => handleCheckboxChange(e)}/>
                <StyledButton text="Dodaj"/>
            </div>
        </div>
    );
}

export default AddCalendarEvent;