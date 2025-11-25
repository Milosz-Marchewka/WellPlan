import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";
import Banner from "../../assets/banner/full.png"

const LogIn = ({user, setUser, setWithExpiry, navigate})=>{
    const [userLogData, setUserLogData] = useState({
        email: "",
        password: "",
    });

    const [inputsErrors, setInputsErrors] = useState({
        email: null,
        password: null,
    });

    const [log, setLog] = useState(null);

    useEffect(()=>{
        if(user != null){
            navigate("/");
        }
    }, []);

    const check = async ()=>{
        try{
            const req = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userLogData.email,
                    password: userLogData.password
                })
            });

            if(!req.ok){
                setLog("Błąd pobierania danych.");
            }

            const res = await req.json();
            if(res.message){
                const current = res.user;
                setUser(current);
                setWithExpiry(current);
                navigate("/");
            } else {
                setUser(null);
                setLog(res.error);
                switch(res.id){
                    case 1:
                        setInputsErrors({
                            email: -1,
                            password: -1,
                        });
                    break;
                    case 2:
                        setInputsErrors(prev => ({
                            ...prev,
                            email: -1,
                        }))
                    break;
                    case 3:
                        setInputsErrors(prev => ({
                            ...prev,
                            password: -1,
                        }))
                    break;
                }
            }
        } catch(err){
            setLog("Błąd serwera.");
        }
    }

    const handleChange = (e) => {
        setUserLogData(prev => ({...prev, [e.target.name]: e.target.value}));
        setInputsErrors(prev => ({...prev, [e.target.name]: null}));
    }

    return(
        <div className="flex w-screen min-h-screen items-center justify-start flex-col px-1 pt-10 md:pt-40 gap-5 ">
            <img src={Banner} alt="banner" className="mb-5 w-100"/>
            <div className="bg-gray-800 max-w-130 lg:max-w-screen text-white w-full md:w-1/2 lg:w-120 py-10 px-3 md:p-10 pb-5 rounded-lg shadow-lg shadow-gray-800">
                <h2 className="text-emerald-400 text-3xl">Logowanie</h2>
                <div className="my-5 flex flex-col gap-2">
                    <StyledInput type="email" label="E-mail" name="email" value={userLogData.email} onChange={handleChange} valid={inputsErrors.email === null}/>
                    <StyledInput type="password" label="Hasło" name="password" value={userLogData.password} onChange={handleChange} valid={inputsErrors.password == null}/>
                </div>
                <StyledButton text="Zaloguj Się" click={check} classTw={"block mx-auto w-1/2"}/>
                <div className="block text-center mt-2">
                    Nie masz konta? 
                    <Link to="/signup" className="text-emerald-400 hover:underline ml-1">
                        Zarejestruj się!
                    </Link>
                </div>
            </div>
            {
                log !== null ?
                    <div className="bg-red-400 w-full sm:w-1/4 max-w-130 lg:max-w-screen rounded-lg p-3 border border-red-500 shadow-sm shadow-red-800">
                        <h5 className="text-2xl">Błąd:</h5>
                        <p className="text-lg">{log}</p>
                    </div>
                :
                <></>
            }
        </div>
    );
}

export default LogIn;
