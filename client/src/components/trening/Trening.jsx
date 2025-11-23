import TreningDay from "./TreningDay";
import AddTrening from "./AddTrening";
import { useState, useEffect } from "react";

const polishNameOfDay = (name) => {
    const map = {
        monday: "Poniedziałek",
        tuesday: "Wtorek",
        wednesday: "Środa",
        thursday: "Czwartek",
        friday: "Piątek",
        saturday: "Sobota",
        sunday: "Niedziela",
    };
    return map[name.toLowerCase()] || name;
};


const Trening = ({user}) => {

    const [isAddTreningShown, setIsAddTreningShown] = useState(false);
    const [trenings, setTrenings] = useState([]);

    const showAddTrening= () => {
        setIsAddTreningShown(true);
        console.log(trenings);
    }

    const hideAddTrening = () => {
        setIsAddTreningShown(false);
        console.log(isAddTreningShown);
    }

    useEffect(()=>{
        (async()=>{
            let x = await fetchTraining(user?.email);
            if(x?.error){
                return;
            }
            setTrenings(objectToMyArray(x));
        })()
    }, [user, isAddTreningShown]);
    
    const objectToMyArray = (object) => {
        let array = [];
        for(let i in object){
            for(let j of object[i]){
                array.push({day: i, type: j.type, plan: j.plan});
            }
        }
        return array;
    }

    const fetchTraining = async(email)=>{
        try{
            const req = await fetch(`http://localhost:5000/training/get?email=${email}`, {
                method: "GET"
            })

            if(!req.ok) console.log('req');

            return await req.json();
        } catch(e){
            console.log('catch');
        }
    }; 

    const foreignSet = (email)=>{
        (async()=>{
            const fetched = await fetchTraining(email);
            if(fetched?.error) return;
            setTrenings(objectToMyArray(fetched));
        })();
    }


    return(
        <div>
            <div className="w-fit h-fit px-15 pt-2 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Trening</h1>
                <p className="mb-4 text-gray-200 text-lg">Zarządzaj swoimi treningami</p>
            </div>
            {
                isAddTreningShown ?
                <div className="absolute min-h-screen w-screen top-0 left-0 flex items-center z-80">
                        <AddTrening user={user} cancelFunction={hideAddTrening} foreignSet={foreignSet}/>
                </div>
                :
                <></>
            }
            <div className="flex items-center justify-center flex-wrap gap-5 z-50" style={isAddTreningShown ? {filter: "blur(20px)"} : {}}>
                {
                    Array.isArray(trenings) && trenings.length > 0 ?
                    trenings.map((element, index) => (
                        <TreningDay day={polishNameOfDay(element.day)} type={element.type} exercises={element.plan}/>
                    ))
                    :
                    <></>
                }

                <div className="flex flex-col items-center gap-3 w-60 cursor-pointer" onClick={showAddTrening}>
                    <div className="bg-emerald-500 text-center rounded-full flex items-center justify-center text-white w-20 h-20">
                        <div className="text-8xl transform -translate-y-1.5">+</div>
                    </div>
                    <h4 className="text-xl text-white">Dodaj Trening</h4>
                </div>
            </div>
        </div>
    );
}

export default Trening;