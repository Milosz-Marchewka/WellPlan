import StyledInput from "../../inputs/StyledInput";
import StyledButton from "../../buttons/StyledButton";
import StyledRadios from "../../inputs/StyledRadios";
import { useEffect, useRef, useState, useContext } from "react";
import { SignupContext } from "../SignUp";

const PersonalInformations = () => {

    const {handleChange, handleChangeManual, newUser, setCanProgress} = useContext(SignupContext);
    const [passwordCopy, setPasswordCopy] = useState({iPassword: newUser?.password || "", iPasswordRepeat: newUser?.password || ""});
    const [genderValue, setGenderValue] = useState(newUser?.gender == "male" || !newUser?.gender ? 0 : 1);


    const [inputsErrors, setInputsErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        age: null,
    });


    useEffect(()=>{
        
        setCanProgress(() => validate);

    }, [setCanProgress, newUser]);

    const validate = () =>{
        let isError = false;
        let newErrors = {
            name: null,
            surname: null,
            email: null,
            password: null,
            age: null
        };


        if (!newUser?.name || newUser.name.trim() === "") {
            newErrors.name = 1;
            isError = true;
        }
        if (!newUser?.surname || newUser.surname.trim() === "") {
            newErrors.surname = 1;
            isError = true;
        }
        if (!newUser?.email || newUser.email.trim() === "") {
            newErrors.email = 1;
            isError = true;
        }
        if (!passwordCopy?.iPassword || !passwordCopy?.iPasswordRepeat || passwordCopy.iPassword.trim() === "" || passwordCopy.iPasswordRepeat.trim() === "" || passwordCopy.iPassword !== passwordCopy.iPasswordRepeat) {
            newErrors.password = 1;
            isError = true;
        }
        if (!newUser?.age || Number(newUser.age) <= 0) {
            newErrors.age = 1;
            isError = true;
        }

        setInputsErrors(prev => ({ ...prev, ...newErrors }));
        console.log(newUser);
        console.log(inputsErrors);

        return !isError;
    }

    useEffect(()=>{
        if(newUser === null) return;
    }, [newUser]);

    useEffect(()=>{
        if(passwordCopy?.iPassword === passwordCopy?.iPasswordRepeat){
            handleChangeManual("password", passwordCopy?.iPassword);
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
            <StyledInput label="Imię" name="name" onChange={handleChange} value={newUser.name} valid={inputsErrors.name === null}/>
            <StyledInput label="Nazwisko" name="surname" onChange={handleChange} value={newUser.surname} valid={inputsErrors.surname === null}/>
            <StyledInput type="email" label="E-mail" name="email" onChange={handleChange} value={newUser.email} valid={inputsErrors.email === null}/>
            <StyledInput id="iPassword" type="password" label="Hasło" name="password" value={passwordCopy.iPassword} valid={inputsErrors.password === null} onChange={handlePasswordChange}/>
            <StyledInput id="iPasswordRepeat" type="password" label="Powtórz Hasło" name="password" value={passwordCopy?.iPasswordRepeat} valid={inputsErrors.password === null} onChange={handlePasswordChange}/>
            <StyledInput type="number" label="Wiek" name="age" onChange={handleChange} valid={inputsErrors.age === null} value={newUser.age}/>
            <div className="ml-2">
                <StyledRadios options={["Mężczyzna", "Kobieta"]} name="gender" label="Płeć" onChange={handleGenderChange} selected={genderValue}/>
            </div>
        </div>
    );
}

export default PersonalInformations;