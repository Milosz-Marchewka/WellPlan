import Meals from "./Meals";
import Statistic from "./Statistic";

const Nutrition = ()=>{

    

    return(
        <div>
            <div className="w-fit h-fit px-15 pt-2 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Żywienie</h1>
                <p className="mb-4 text-gray-200 text-lg">Odżywiaj się zdrowo</p>
            </div>
            
            <div className="flex p-10 gap-5">
                <div className="flex-2">
                    <Meals />
                </div>
                <div className="flex-1">
                    <Statistic/>
                </div>
            </div>
        </div>
    );
}

export default Nutrition;