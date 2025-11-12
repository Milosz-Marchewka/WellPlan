import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";

function AddCalendarEvent(){

    return(
        <div className="text-center h-fit w-1/3">
            <h3 className="w-full bg-emerald-400 text-2xl rounded-t-lg p-5">Dodaj nowe wydarzenie</h3>
            <div className="w-full flex flex-col gap-5 bg-gray-800 rounded-b-lg p-5 ">
                <StyledInput label="Nazwa"/>
                <StyledInput label="Dzień" type="date"/>
                <StyledInput label="Rozpoczęcie" type="time"/>
                <StyledInput label="Zakończenie" type="time"/>
                <StyledButton text="Dodaj"/>
            </div>
        </div>
    );
}

export default AddCalendarEvent;