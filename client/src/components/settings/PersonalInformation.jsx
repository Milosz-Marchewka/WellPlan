import { useState } from "react";
import StyledButton from "../buttons/StyledButton";
import StyledInput from "../inputs/StyledInput";
import { useEffect } from "react";

const PersonalInformation = ({user, setUser})=>{

    //NOWE DANE
    const [newUserData, setNewUserData] = useState(user);

    useEffect(()=>{
        setNewUserData(user);
    }, [user]);

    const handleChange = (e) => {
        setNewUserData(prev => ({...prev, [e.target.name]: e.target.value}));
        console.log("DebugText: ", newUserData);
    }

    //Probowalem cos zrobic ale ni ciul
    const save = async ()=>{
        const ret = await saveData(newUserData?.name, newUserData?.surname, newUserData?.email, newUserData?.email !== user?.email && user?.email, newUserData?.age, newUserData?.gender, newUserData?.height, newUserData?.weight);
        setUser(ret.user);
    }
    //tu tez
    const saveData = async (name, surname, email, oldEmail, age, gender, height, weight)=>{
        try{
            console.log([name, surname, email, age, gender, height, weight]);
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
                console.log("Błąd pobierania danych.", await req.text());
                return await req.text();
            }

            const res = await req.json();
            return res;
        } catch(err){
            console.log("Błąd serwera.");
        }
    }

    return(
        <div className="min-w-60 h-fit w-1/3 max-w-1/3 rounded-2xl bg-gray-800 flex flex-col pt-7 pb-4 pl-5 pr-5">
            <h3 className="mb-8 text-emerald-500 text-2xl">Dane osobowe</h3>
            <div className="flex gap-4">
                <StyledInput name="name" label="Imię" value={newUserData?.name} width="w-1/2" onChange={handleChange}/>
                <StyledInput name="surname" label="Nazwisko" value={newUserData?.surname} width="w-1/2" onChange={handleChange}/>
            </div>
            <StyledInput name="email" type="email" label="Email" value={newUserData?.email} mt="mt-6" onChange={handleChange}/>
            <div className="flex gap-4 mt-6">
                <StyledInput name="age" type="number" label="Wiek" value={newUserData?.age} width="w-1/3" onChange={handleChange}/>
                <StyledInput name="height" type="number" label="Wzrost" value={newUserData?.height} width="w-1/3" onChange={handleChange}/>
                <StyledInput name="weight" type="number" label="Waga" value={newUserData?.weight} width="w-1/3" onChange={handleChange}/>
            </div>
            <StyledButton text="Zapisz zmiany" classTw="mt-6" click={() => save()}/>
        </div>
    )
}

export default PersonalInformation;