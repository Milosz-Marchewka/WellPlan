import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = ({user, setUser, selectedOption, setSelectedOption, navigate})=>{
    return(
       <div className="flex w-screen h-fit">
            <Sidebar user={user} setUser={setUser} selectedOption={selectedOption} setSelectedOption={setSelectedOption} navigate={navigate}/>
            <div className="pb-20 md:pb-0 md:ml-40 lg:ml-70 w-full">
                <Outlet/>
            </div>
        </div> 
    );
}

export default Layout;