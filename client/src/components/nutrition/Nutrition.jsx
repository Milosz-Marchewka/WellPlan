import Meals from "./Meals";
import Statistic from "./Statistic";
import AddMeal from "./AddMeal";

const Nutrition = ({user, eaten, setEaten, fetchEaten})=>{

    

    return(
        <div>
            <div className="w-fit h-fit px-15 pt-2 flex gap-1 flex-col align-middle text-shadow-md text-shadow-gray-900">
                <h1 className='mt-5 text-emerald-200 text-3xl'>Żywienie</h1>
                <p className="mb-4 text-gray-200 text-lg">Odżywiaj się zdrowo</p>
            </div>
            
            <div className="flex flex-col-reverse gap-5 w-full justify-center px-5 2xl:flex-row">
                <div className="flex-3">
                    <Meals />
                </div>
                <div className="flex-2 flex flex-col gap-3">
                    <Statistic user={user} eaten={eaten} setEaten={setEaten} fetchEaten={fetchEaten}/>
                    <AddMeal user={user} setEaten={setEaten} fetchEaten={fetchEaten}/>
                </div>
            </div>
        </div>
    );
}

export default Nutrition;