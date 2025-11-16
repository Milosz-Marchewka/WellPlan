import {useState} from "react"
import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";
import StyledCheckbox from "../inputs/StyledCheckbox";
import StyledColorInput from "../inputs/StyledColorInput";

const AddCalendarEvent = ({events, setEvents, fetchEvents})=>{

    const [isStartEqualEnd, setIsStartEqualEnd] = useState(false);

    const [eventData, setEventData] = useState({
        title: "",
        date: new Date().toISOString().split("T")[0],
        start: "",
        end: "",
        color: "#FFFFFF"
    });

    const add = async ()=>{
        console.log(await addEvent(eventData.title, eventData.date, eventData.start, eventData.end, eventData.color));
        await fetchEvents("activities@test.pl", new Date());
    }

    const addEvent = async (name, date, start, end, color)=>{
        try{
            const req = await fetch("http://localhost:5000/calendar/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: "activities@test.pl",
                    name,
                    date,
                    start,
                    end,
                    color
                })
            });

            if(!req.ok){
                console.log("Błąd pobierania danych.");
                return await req.text();
            }

            const res = await req.json();
            return res.message ? res.message : res.error;
        } catch(err){
            console.log("Błąd serwera.");
        }
    }

    const handleChange = (e)=>{
        const element = e.target;
        setEventData(prevEventData => ({...prevEventData, [element.name]: element.value}));
        console.log("DebugText: ", eventData);
    }

    const handleCheckboxChange = (e)=>{
        if(e.target.checked){
            setIsStartEqualEnd(true);
            setEventData(prevEventData => ({...prevEventData, ["end"]: prevEventData.start}))
        } else{
            setIsStartEqualEnd(false);
        }
    }

    return(
        <div className="text-center h-fit w-1/3 shadow-lg shadow-gray-800 rounded-2xl overflow-hidden">
            <h3 className="w-full bg-gray-900 text-emerald-400 text-2xl p-5">Dodaj nowe wydarzenie</h3>
            <div className="bg-gray-800 p-5">
                <div className="mx-auto w-5/6 flex flex-col gap-5 bg-gray-800 py-4">
                        <StyledInput label="Nazwa" name="title" value={eventData.title} onChange={(e) => handleChange(e)}/>
                        <StyledInput label="Dzień" name="date" type="date" value={eventData.date} onChange={(e) => handleChange(e)}/>
                        <StyledInput label="Rozpoczęcie" name="start" type="time" value={eventData.start} onChange={(e) => handleChange(e)}/>
                        <StyledInput label="Zakończenie" name="end" type="time" value={isStartEqualEnd ? eventData.start : eventData.end} disabled={isStartEqualEnd ? true : false} onChange={(e) => handleChange(e)}/>
                        <StyledCheckbox label="Taka sama godzina rozpoczęcia i zakończenia" onChange={(e) => handleCheckboxChange(e)}/>
                        <StyledColorInput label="Wybierz kolor" name="color" id="color" value={eventData.color} onChange={(e)=>handleChange(e)}/>
                        {/* <input type="color" name="color" id="color" value={eventData.color} onChange={(e)=>handleChange(e)}/> */}
                        <StyledButton click={add} text="Dodaj"/>
                </div>
            </div>
        </div>
    );
}

export default AddCalendarEvent;