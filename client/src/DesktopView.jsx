import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Nutrition from "./components/nutrition/Nutrition";
import Statistics from "./components/statistics/Statistics";
import Settings from "./components/settings/Settings";
import LogIn from "./components/welcome/LogIn";
import SignUp from "./components/welcome/SignUp";

function DesktopView(){

    const [selectedOption, setSelectedOption] = useState("/");
    const location = useLocation();
    const [isLogged, setIsLogged] = useState(false);


    useEffect(()=>{
        setSelectedOption(location.pathname.split("/")[1]);
    }, [location]);

    return(
        isLogged ?
        <div className="flex w-screen h-fit">
            <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            <div className="ml-10 lg:ml-70 w-full">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/calendar" element={<Calendar/>}/>
                    <Route path="/nutrition" element={<Nutrition/>}/>
                    <Route path="/statistics" element={<Statistics/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
        :
        <Routes>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}


export default DesktopView;