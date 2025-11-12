import PersonalInformation from "./PersonalInformation";

const Settings = ()=>{
    return(
        <div className="w-full flex flex-col items-center bg-transparent">
            <div className="w-full h-22.5 pl-[10%] flex gap-1 flex-col align-middle bg-gray-800 border-b border-b-black">
                <h1 className='mt-auto text-white text-2xl'>Ustawienia</h1>
                <p className="mb-4 text-gray-300">Zarządzaj swoim kontem oraz preferencjami</p>
            </div>
            <PersonalInformation/>
        </div>
    )
}

export default Settings;