import {useState, useEffect} from "react"
import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";
import StyledCheckbox from "../inputs/StyledCheckbox";
import StyledColorInput from "../inputs/StyledColorInput";

const AddCalendarEvent = ({user, fetchEvents})=>{
    useEffect(()=>{
            if(user === null) return;
        }, [user])

    const [isStartEqualEnd, setIsStartEqualEnd] = useState(false);

    const [eventData, setEventData] = useState({
        title: "",
        date: new Date().toISOString().split("T")[0],
        start: "",
        end: "",
        color: "#FFFFFF"
    });

    const [log, setLog] = useState({level: "", message: ""})

    const [inputsError, setInputsError] = useState({
        title: null,
        date: null,
        start: null,
        end: null,
    });

    const add = async ()=>{
        let isError = false;
        if(eventData.title.trim() == ""){
            setInputsError(prev => ({...prev, title: 1}));
            isError = true;
        }
        if(eventData.date.trim() == ""){
            setInputsError(prev => ({...prev, date: 1}));
            isError = true;
        }
        if(eventData.start.trim() == ""){
            setInputsError(prev => ({...prev, start: 1}));
            isError = true;
        }
        if(eventData.end.trim() == ""){
            setInputsError(prev => ({...prev, end: 1}));
            isError = true;
        }
        
        if(isError){
            setLog({level: "error", message: "Proszę wypełnić wszystkie pola"});
            return;
        }

        console.log(await addEvent(user.email, eventData.title, eventData.date, eventData.start, eventData.end, eventData.color));
        await fetchEvents(user?.email, new Date(eventData.date));
    }

    const addEvent = async (email, name, date, start, end, color)=>{
        try{
            console.log([email, name, date, start, end, color]);
            const req = await fetch("http://localhost:5000/calendar/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    name,
                    date,
                    start,
                    end,
                    color
                })
            });

            if(!req.ok){
                setLog({level: "error", message: 'Błąd serwera'});
                return await req.text();
            }

            const res = await req.json();
            setLog({level: "info", message: `Pomyślnie dodano ${eventData.title} wydarzenie`});
            setEventData({
                title: "",
                date: new Date().toISOString().split("T")[0],
                start: "",
                end: "",
                color: "#FFFFFF"
            });
            return res.message ? res.message : res.error;
        } catch(err){
            setLog({level: "error", message: 'Błąd serwera'})
        }
    }

    const handleChange = (e)=>{
        setEventData(prevEventData => ({...prevEventData, [e.target.name]: e.target.value}));
        setInputsError(prev => ({...prev, [e.target.name]: null}));
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
        <div className="text-center h-fit w-full lg:w-1/3 shadow-lg shadow-gray-800 rounded-2xl overflow-hidden">
            <h3 className="w-full bg-gray-900 text-emerald-400 text-2xl p-5">Dodaj nowe wydarzenie</h3>
            <div className="bg-gray-800 p-5">
                <div className="mx-auto w-5/6 flex flex-col gap-5 bg-gray-800 py-4">
                        <StyledInput label="Nazwa" name="title" value={eventData.title} onChange={(e) => handleChange(e)} valid={inputsError.title == null}/>
                        <StyledInput label="Dzień" name="date" type="date" value={eventData.date} onChange={(e) => handleChange(e)} valid={inputsError.date == null}/>
                        <StyledInput label="Rozpoczęcie" name="start" type="time" value={eventData.start} onChange={(e) => handleChange(e)} valid={inputsError.start == null}/>
                        <StyledInput label="Zakończenie" name="end" type="time" value={isStartEqualEnd ? eventData.start : eventData.end} disabled={isStartEqualEnd ? true : false} onChange={(e) => handleChange(e)} valid={inputsError.end == null}/>
                        <StyledCheckbox label="Taka sama godzina rozpoczęcia i zakończenia" onChange={(e) => handleCheckboxChange(e)}/>
                        <StyledColorInput label="Wybierz kolor" name="color" id="color" value={eventData.color} onChange={(e)=>handleChange(e)}/>
                        <StyledButton click={() => add()} text="Dodaj"/>
                </div>
            </div>
            {
                log.level == "error" ?
                <h1 className="text-2xl bg-red-400 text-gray-900 p-3">{log.message}</h1>
                :
                log.level == "info" ?
                <h1 className="text-2xl bg-green-400 text-gray-900 p-3">{log.message}</h1>
                :
                <></>
            }
        </div>
    );
}

export default AddCalendarEvent;