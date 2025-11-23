import { useEffect, useState } from "react";
import RadialProgress from "./RadialProgress";
import { useEaten } from "../../hooks/useEaten";

const Statistic = ({user, eaten, setEaten, fetchEaten}) => {

    useEffect(()=>{
        if(!user?.email) return;
        (async()=>{
            const eat = await fetchEaten();
            setEaten(eat);
            console.log(eat);
        })()
    }, [user]);


    return(
        <div className="bg-gray-900 text-emerald-500 text-4xl text-center rounded-3xl w-full overflow-hidden">
            <h2 className="py-5 text-2xl">Dzisiejsza dieta</h2>
            <div className="grid grid-cols-2 grid-row-2 md:flex justify-between p-5 text-white text-xl bg-gray-800 flex-wrap gap-y-3">
                <div className="flex-1 flex flex-col align-items min-w-[120px]">
                    <h4 className="mb-1">Kalorie:</h4>
                    <RadialProgress percentage={eaten?.percentages?.calories || 0} color="lime"/>
                    <h6 className="text-[lime]">{eaten?.eaten?.calories}/{eaten?.max?.calories}</h6>
                </div>
                <div className="flex-1 flex flex-col align-items min-w-[120px]">
                    <h4 className="mb-1">Białko:</h4>
                    <RadialProgress percentage={eaten?.percentages?.proteins || 0} color="cyan"/>
                    <h6 className="text-[cyan]">{eaten?.eaten?.proteins}/{eaten?.max?.proteins}</h6>
                </div>
                <div className="flex-1 flex flex-col align-items min-w-[120px]">
                    <h4 className="mb-1">Tłuszcze:</h4>
                    <RadialProgress percentage={eaten?.percentages?.fat || 0} color="yellow"/>
                    <h6 className="text-[yellow]">{eaten?.eaten?.fat}/{eaten?.max?.fat}</h6>
                </div>
                <div className="flex-1 flex flex-col align-items min-w-[120px]">
                    <h4 className="mb-1">Węglowodany:</h4>
                    <RadialProgress percentage={eaten?.percentages?.carbs || 0} color="lightcoral"/>
                    <h6 className="text-[lightcoral]">{eaten?.eaten?.carbs}/{eaten?.max?.carbs}</h6>
                </div>
            </div>
        </div>
    );
}

export default Statistic;