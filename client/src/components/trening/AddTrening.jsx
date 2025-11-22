import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";
import StyledSelect from "../inputs/StyledSelect";
import { useState } from "react";

const AddTrening = () => {

    const [treningData, setTreningData] = useState({
        type: "",
    });

    const handleChange = (e) => {
        setTreningData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    return(
        <div className="text-center h-fit w-full lg:w-1/3 shadow-lg shadow-gray-800 rounded-2xl overflow-hidden">
            <h3 className="w-full bg-gray-900 text-emerald-400 text-2xl p-5">Dodaj nowy trening</h3>
            <div className="bg-gray-800 p-5">
                <StyledInput label="Typ treningu (FBW, Pull, Push itd)" name="type" value={treningData.type} onChange={(e) => handleChange(e)}/>
                <StyledSelect label="Dzień tygodnia" options={[
                { value: "Monday", title: "Poniedziałek" },
                { value: "Tuesday", title: "Wtorek" },
                { value: "Wednesday", title: "Środa" },
                { value: "Thursday", title: "Czwartek" },
                { value: "Friday", title: "Piątek" },
                { value: "Saturday", title: "Sobota" },
                { value: "Sunday", title: "Niedziela" }
                ]}
                />
            </div>
        </div>
    );
}

export default AddTrening;