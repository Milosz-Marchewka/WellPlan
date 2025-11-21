import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = ({selectedOption, setSelectedOption})=>{
    return(
       <div className="flex w-screen h-fit">
            <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            <div className="pb-20 md:pb-0 md:ml-20 lg:ml-70 w-full">
                <Outlet/>
            </div>
        </div> 
    );
}

export default Layout;