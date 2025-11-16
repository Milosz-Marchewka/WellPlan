import StyledInput from "../../inputs/StyledInput";
import StyledButton from "../../buttons/StyledButton";
import StyledRadios from "../../inputs/StyledRadios";
import { useEffect, useRef, useState } from "react";

const PersonalInformations = ({onChange, onChangeManual, userData}) => {

    useEffect(()=>{
        document.getElementById("iPassword").value = userData.password;
        document.getElementById("iPasswordRepeat").value = userData.password;
    }, []);

    const handlePasswordChange = () => {
        const p1 = document.getElementById("iPassword").value;
        const p2 = document.getElementById("iPasswordRepeat").value;
        if(p1 === p2){
            onChangeManual("password", p1);
        }else{
            onChangeManual("password", "");
        }
    }

    const handleGenderChange = () => {
        if(document.getElementById("gender0").checked){
            onChangeManual("gender", "male")
        }else{
            onChangeManual("gender", "female")
        }
    }

    return(
        <div className="flex flex-col gap-3">
            <h2>Dane osobowe:</h2>
            <StyledInput label="Imię" name="name" onChange={onChange} value={userData.name}/>
            <StyledInput label="Nazwisko" name="surname" onChange={onChange} value={userData.surname}/>
            <StyledInput type="email" label="E-mail" name="email" onChange={onChange} value={userData.email}/>
            <StyledInput id="iPassword" type="password" label="Hasło" name="password" onChange={handlePasswordChange}/>
            <StyledInput id="iPasswordRepeat" type="password" label="Powtórz Hasło" name="password" onChange={handlePasswordChange}/>
            <StyledInput type="number" label="Wiek" name="age" onChange={onChange} value={userData.age}/>
            <div className="ml-2">
                <StyledRadios options={["Mężczyzna", "Kobieta"]} name="gender" label="Płeć" onChange={handleGenderChange} selected={userData.gender == "male" ? 0 : 1}/>
            </div>
        </div>
    );
}

export default PersonalInformations;