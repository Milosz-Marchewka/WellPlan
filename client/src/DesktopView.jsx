import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";

function DesktopView(){

    const [selectedOption, setSelectedOption] = useState(0);

    function changeOption(index){
        setSelectedOption(s => s = index)
    }

    return(
        <>
            <div className="flex w-screen bg-gray-700 ">
              <Sidebar selectedOption={selectedOption} onSwitchOption={changeOption}/>
              <div className=""></div>  
            </div>
        </>
    );
}


export default DesktopView;