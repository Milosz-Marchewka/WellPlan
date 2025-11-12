import StyledInput from "../inputs/StyledInput";

const PersonalInformation = ()=>{
    return(
        <div className="min-w-60 w-1/3 max-w-1/3 rounded-2xl bg-gray-500 flex flex-col pt-7 pb-4 pl-5 pr-5">
            <h3 className="mb-8 text-white">Dane osobowe</h3>
            <div className="flex gap-4">
                <StyledInput id="name" label="Imię" width="w-1/2"/>
                <StyledInput id="surname" label="Nazwisko" width="w-1/2"/>
            </div>
            <StyledInput id="email" type="email" label="Email" mt="mt-6"/>
            <div className="flex gap-4 mt-6">
                <StyledInput id="age" type="number" label="Wiek" width="w-1/3"/>
                <StyledInput id="height" type="number" label="Wzrost" width="w-1/3"/>
                <StyledInput id="weight" type="number" label="Waga" width="w-1/3"/>
            </div>
        </div>
    )
}

export default PersonalInformation;