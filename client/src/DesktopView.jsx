import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Nutrition from "./components/nutrition/Nutrition";
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
        console.log(user);
        return item.user;
    }


    // HACK: this works instead of sessions lol
    // try to go to another url, it will pull you back unless the state is saturated lol
    // edit: now featuring pseudosessions&trade;
    useEffect(()=>{
        const currentUser = getUserWithExpiry();
        console.log("C:", currentUser);
        setUser(currentUser);
        if(currentUser == null){
            navigate("/login");
        } else {
            console.log("path:", location.pathname.split("/")[1]);
            navigate(location.pathname.split("/")[1]);
        }
    }, []);

    useEffect(()=>{console.log("U:", user)}, [user]);


    useEffect(()=>{
        setSelectedOption(location.pathname.split("/")[1]);
    }, [location]);

    return(
        <Routes>
            <Route path="/" element={<Layout user={user} setUser={setUser} selectedOption={selectedOption} setSelectedOption={setSelectedOption} navigate={navigate}/>}>
                <Route index element={<Home user={user}/>}/>
                <Route path="calendar" element={<Calendar user={user}/>} />
                <Route path="nutrition" element={<Nutrition/>} />
                <Route path="trening" element={<Trening user={user}/>} />
                <Route path="settings" element={<Settings user={user}/>} />
            </Route>
            <Route path="/login">
                <Route index element={<LogIn user={user} setUser={setUser} setWithExpiry={setWithExpiry} navigate={navigate}/>}/>
            </Route>
            <Route path="/signup" element={<SignUp user={user} setUser={setUser} navigate={navigate} />}>
                <Route index element={<PersonalInformation/>}/>
                <Route path="bodyMeasurements" element={<BodyMeasurements/>}/>
                <Route path="lifestyle" element={<Lifestyle/>}/>
            </Route>
        </Routes>
    );
}


export default DesktopView;