import StyledInput from "../../inputs/StyledInput";
import StyledButton from "../../buttons/StyledButton";
import StyledRadios from "../../inputs/StyledRadios";
import { useEffect, useRef, useState, useContext } from "react";
import { SignupContext } from "../SignUp";

const PersonalInformations = () => {

    const {handleChange, handleChangeManual, userData} = useContext(SignupContext);

    const [passwordCopy, setPasswordCopy] = useState({iPassword: userData?.password || "", iPasswordRepeat: userData?.password || ""});
    const [genderValue, setGenderValue] = useState(userData.gender == "male" ? 0 : 1);

    useEffect(()=>{
        if(passwordCopy.iPassword === passwordCopy.iPasswordRepeat){
            handleChangeManual("password", passwordCopy.iPassword);
        }else{
            handleChangeManual("password", "");
        }
    }, [passwordCopy]);

    useEffect(()=>{
        if(genderValue == 0){
            handleChangeManual("gender", "male");
        }else{
            handleChangeManual("gender", "female");
        }
    }, [genderValue]);

    const handlePasswordChange = (e) => {
        setPasswordCopy(prev=>({
            ...prev,
            [e.target.id]: e.target.value
        }));
        console.log(passwordCopy.iPassword, passwordCopy.iPasswordRepeat);
    }

    const handleGenderChange = (value) => {
        setGenderValue(prev => value);
    }

    return(
        <div className="flex flex-col gap-3">
            <h2>Dane osobowe:</h2>
            <StyledInput label="Imię" name="name" onChange={handleChange} value={userData.name}/>
            <StyledInput label="Nazwisko" name="surname" onChange={handleChange} value={userData.surname}/>
            <StyledInput type="email" label="E-mail" name="email" onChange={handleChange} value={userData.email}/>
            <StyledInput id="iPassword" type="password" label="Hasło" name="password" value={passwordCopy.iPassword} onChange={handlePasswordChange}/>
            <StyledInput id="iPasswordRepeat" type="password" label="Powtórz Hasło" name="password" value={passwordCopy.iPasswordRepeat} onChange={handlePasswordChange}/>
            <StyledInput type="number" label="Wiek" name="age" onChange={handleChange} value={userData.age}/>
            <div className="ml-2">
                <StyledRadios options={["Mężczyzna", "Kobieta"]} name="gender" label="Płeć" onChange={handleGenderChange} selected={genderValue}/>
            </div>
        </div>
    );
}

export default PersonalInformations;