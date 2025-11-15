import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const SignUp = ({user, navigate})=>{
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        gender: "",
        age: -1,
        height: -1,
        weight: -1,
    });

    useEffect(()=>{
        if(user != null){
            navigate("/");
        }
    }, []);

    const handleChange = (e) => {
        setUserData(prev => ({...prev, [e.target.name]: e.target.value}));
        console.log("DebugText: ", userData);
    }

    return(
        <div className="bg-gray-800 text-white w-1/4 min-w-sm p-10 rounded-lg shadow-lg shadow-gray-800">
            <h2 className="text-emerald-400 text-3xl">Rejestracja</h2>
            <div className="my-5 flex flex-col gap-2">
                <Outlet/>
            </div>
        </div>
    );
}

export default SignUp;
