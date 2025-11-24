import { useState } from "react";
import StyledButton from "../buttons/StyledButton";
import StyledInput from "../inputs/StyledInput";
import { useEffect } from "react";

const PersonalInformation = ({user, setUser})=>{
    const [newUserData, setNewUserData] = useState(user);

    const [log, setLog] = useState({level: "", message: ""})
    const [inputsError, setInputsError] = useState({
        name: null,
        surname: null,
        email: null,
        age: null,
        height: null,
        weight: null
    });

    useEffect(()=>{
        setNewUserData(user);
    }, [user]);

    const handleChange = (e) => {
        setNewUserData(prev => ({...prev, [e.target.name]: e.target.value}));
        setInputsError(prev => ({...prev, [e.target.name]: null}));
    }

    const save = async ()=>{
        let isError = false;
        if(newUserData.name.trim() == ""){
            setInputsError(prev => ({...prev, name: 1}));
            isError = true;
        }
        if(newUserData.surname.trim() == ""){
            setInputsError(prev => ({...prev, surname: 1}));
            isError = true;
        }
        if(newUserData.email.trim() == ""){
            setInputsError(prev => ({...prev, email: 1}));
            isError = true;
        }else{
            const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!reg.test(newUserData.email)){
                setInputsError(prev => ({...prev, email: "Nieprawidłowy adres email"}));
                isError = true;
            }
        }
        if(newUserData.age == null || Number(newUserData.age) <= 0){
            setInputsError(prev => ({...prev, age: 1}));
            isError = true;
        }
        if(newUserData.height == null || Number(newUserData.height) <= 0){
            setInputsError(prev => ({...prev, height: 1}));
            isError = true;
        }
        if(newUserData.weight == null || Number(newUserData.weight) <= 0){
            setInputsError(prev => ({...prev, weight: 1}));
            isError = true;
        }

        if(isError){
            setLog({level: "error", message: "Nieprawidłowe dane"});
            return;
        } 

        const ret = await saveData(newUserData?.name, newUserData?.surname, newUserData?.email, newUserData?.email !== user?.email && user?.email, newUserData?.age, newUserData?.gender, newUserData?.height, newUserData?.weight);
        setUser(ret.user);
    }

    const saveData = async (name, surname, email, oldEmail, age, gender, height, weight)=>{
        try{
            const req = await fetch("http://localhost:5000/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    surname, 
                    email,
                    oldEmail, 
                    age,
                    gender,
                    height, 
                    weight           
                })
            });

            if(!req.ok){
                setLog({level: "error", message: "Błąd serwera"});
                return await req.text();
            }
            
            const res = await req.json();
            setLog({level: "info", message: "Pomyślnie zmieniono dane"});
            return res;
        } catch(err){
            setLog({level: "error", message: "Błąd serwera"});
        }
    }

    return(
        <div className="min-w-60 h-fit w-1/3 max-w-1/3 rounded-2xl overflow-hidden">
            <div className="min-w-60 h-fit w-full bg-gray-800 flex flex-col pt-7 pb-4 pl-5 pr-5">
                <h3 className="mb-8 text-emerald-500 text-2xl">Dane osobowe</h3>
                <div className="flex gap-4">
                    <StyledInput name="name" label="Imię" value={newUserData?.name} width="w-1/2" onChange={handleChange} valid={inputsError.name == null}/>
                    <StyledInput name="surname" label="Nazwisko" value={newUserData?.surname} width="w-1/2" onChange={handleChange} valid={inputsError.surname == null}/>
                </div>
                <StyledInput name="email" type="email" label="Email" value={newUserData?.email} mt="mt-6" onChange={handleChange} valid={inputsError.email == null} errorText={inputsError.email != 1 ? inputsError.email : ""}/>
                <div className="flex gap-4 mt-6">
                    <StyledInput name="age" type="number" label="Wiek" value={newUserData?.age} width="w-1/3" onChange={handleChange} valid={inputsError.age == null}/>
                    <StyledInput name="height" type="number" label="Wzrost" value={newUserData?.height} width="w-1/3" onChange={handleChange} valid={inputsError.height == null}/>
                    <StyledInput name="weight" type="number" label="Waga" value={newUserData?.weight} width="w-1/3" onChange={handleChange} valid={inputsError.weight == null}/>
                </div>
                <StyledButton text="Zapisz zmiany" classTw="mt-6" click={() => save()}/>
            </div>
            {
                log.level == "error" ?
                <h1 className="text-2xl bg-red-400 text-gray-900 p-3 text-center">{log.message}</h1>
                :
                log.level == "info" ?
                <h1 className="text-2xl bg-green-400 text-gray-900 p-3 text-center">{log.message}</h1>
                :
                <></>
            }
        </div>
    )
}

export default PersonalInformation;