import PersonalInformation from "./PersonalInformation";

const Settings = ({user, setUser})=>{
    return(
        <div className="w-full bg-transparent">
            <div className="w-fit h-fit px-15 pt-2 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Ustawienia</h1>
                <p className="mb-4 text-gray-200 text-lg">Zarządzaj swoim kontem i preferencjami</p>
            </div>
            <div className="flex justify-center gap-5">
                <PersonalInformation user={user} setUser={setUser}/>
            </div>
        </div>
    )
}

export default Settings;