import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Nutrition from "./components/nutrition/Nutrition";
import Statistics from "./components/statistics/Statistics";
import Settings from "./components/settings/Settings";

function DesktopView(){

    const [selectedOption, setSelectedOption] = useState("/");
    const location = useLocation();

    useEffect(()=>{
        setSelectedOption(location.pathname.split("/")[1]);
    }, [location]);

    return(
        <div className="flex w-screen bg-gray-700 ">
            <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/nutrition" element={<Nutrition/>}/>
                <Route path="/statistics" element={<Statistics/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </div>
    );
}


export default DesktopView;