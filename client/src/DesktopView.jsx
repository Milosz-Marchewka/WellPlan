import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Nutrition from "./components/nutrition/Nutrition";
import Statistics from "./components/statistics/Statistics";
import Settings from "./components/settings/Settings";
import LogIn from "./components/welcome/LogIn";
import SignUp from "./components/welcome/SignUp";
import Layout from "./Layout";
import PersonalInformation from "./components/welcome/SignUpPanels/PersonalInformations";
import Lifestyle from "./components/welcome/SignUpPanels/Lifestyle";
import BodyMeasurements from "./components/welcome/SignUpPanels/BodyMeasurements";
import Trening from "./components/trening/Trening";

function DesktopView(){

    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("/");
    const location = useLocation();
    // normally it'd be session but its a prototype
    const [user, setUser] = useState(null);

    // expiry, default 3 days
    const setWithExpiry = (user, ttl = 1000 * 60 * 24 * 3)=>{
        const now = Date.now();
        const item = {
            user, 
            expiry: now + ttl
        }
        localStorage.setItem("user", JSON.stringify(item));
    }

    const getUserWithExpiry = ()=>{
        const itemStr = localStorage.getItem("user");
        if(!itemStr) return null;

        const item = JSON.parse(itemStr);
        if(Date.now() > item.expiry){
            localStorage.removeItem("user");
            return null;
        }
        return item.user;
    }


    // HACK: this works instead of sessions lol
    // try to go to another url, it will pull you back unless the state is saturated lol
    // edit: now featuring pseudosessions&trade;
    // useEffect(()=>{
    //     const currentUser = getUserWithExpiry();
    //     setUser(currentUser);
    //     if(currentUser == null){
    //         navigate("/login");
    //     } else {
    //         navigate("/");
    //      }
    // }, []);


    useEffect(()=>{
        setSelectedOption(location.pathname.split("/")[1]);
    }, [location]);

    return(
        <Routes>
            <Route path="/" element={<Layout selectedOption={selectedOption} setSelectedOption={setSelectedOption} />}>
                <Route index element={<Home/>}/>
                <Route path="calendar" element={<Calendar/>} />
                <Route path="nutrition" element={<Nutrition/>} />
                <Route path="trening" element={<Trening/>} />
                <Route path="settings" element={<Settings/>} />
            </Route>
            <Route path="/login">
                <Route index element={<LogIn user={user} setUser={setUser} setWithExpiry={setWithExpiry} navigate={navigate}/>}/>
            </Route>
            <Route path="/signup" element={<SignUp user={user} navigate={navigate} />}>
                <Route index element={<PersonalInformation/>}/>
                <Route path="bodyMeasurements" element={<BodyMeasurements/>}/>
                <Route path="lifestyle" element={<Lifestyle/>}/>
            </Route>
        </Routes>
    );
}


export default DesktopView;