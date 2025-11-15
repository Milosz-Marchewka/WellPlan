import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StyledInput from "../inputs/StyledInput";
import StyledButton from "../buttons/StyledButton";

const LogIn = ({user, setUser, setWithExpiry, navigate})=>{
    const [userLogData, setUserLogData] = useState({
        email: "",
        password: "",
    });

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
                console.log("Błąd pobierania danych.");
            }

            const res = await req.json();
            if(res.message){
                const current = res.user;
                setUser(current);
                setWithExpiry(current);
                navigate("/");
            } else {
                setUser(null);
                console.log(res.error);
            }
        } catch(err){
            console.log("Błąd serwera.");
        }
    }

    const handleChange = (e) => {
        setUserLogData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    return(
        <div className="flex w-screen min-h-screen items-center justify-start flex-col py-40 gap-10 ">
            <h1 className="text-6xl text-white text-shadow-md text-shadow-gray-900"><span className="text-emerald-400">Student</span> Planner</h1>
            <div className="bg-gray-800 text-white w-1/4 min-w-sm p-10 pb-5 rounded-lg shadow-lg shadow-gray-800">
                <h2 className="text-emerald-400 text-3xl">Logowanie</h2>
                <div className="my-5 flex flex-col gap-2">
                    <StyledInput type="email" label="E-mail" name="email" onChange={handleChange}/>
                    <StyledInput type="password" label="Hasło" name="password" onChange={handleChange}/>
                </div>
                <StyledButton text="Zaloguj Się" click={check} classTw={"block mx-auto w-1/2"}/>
                <div className="block text-center mt-2">
                    Nie masz konta? 
                    <Link to="/signup" className="text-emerald-400 hover:underline ml-1">
                        Zarejestruj się!
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
