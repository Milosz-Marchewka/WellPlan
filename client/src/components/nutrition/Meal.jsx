
const Meal = ({imgUrl, title, prepTime, prepDifficulty, macronutrients}) => {
    

    return(
        <div className="h-50 bg-gray-900 text-white flex w-full items-center overflow-hidden gap-5 rounded-3xl p-3">
            <div className="h-full flex-1 overflow-hidden flex items-center rounded-2xl">
                <img src={imgUrl} alt={imgUrl} className="w-full"/>
            </div>
            <div className="flex-3 h-full">
                <div className="text-center text-3xl h-fit flex items-center px-2 mb-1">
                    <p className="text-sm text-emerald-500 float-left flex-1">Śniadanie</p>
                    <h3 className="flex-8">{title}</h3>
                    <p className="flex-1">-&gt;</p>
                </div>
                <div className="flex items-center h-34 text-center">
                    <div className="flex-1 flex justify-center">
                        <p>Bardzo pyszna, ale taka bardzo bardzo pyszna owsianka z takich bardzo bardzo pysznych składników.</p>
                    </div>
                    <div className="flex-1 flex flex-col border-l-1 border-l-emerald-600 h-full justify-center">
                        <p>{prepTime}</p>
                        <p>Łatwe</p>
                    </div>
                    <div className="flex-1 flex flex-col border-l-1 border-l-emerald-600 h-full justify-center">
                        <p>Kalorie: {macronutrients.calories}kcal</p>
                        <p>Białko: {macronutrients.protein}g</p>
                        <p>Tłuszcze: {macronutrients.fat}g</p>
                        <p>Węglowodany: {macronutrients.carbs}g</p>
                    </div>
                </div>
            </div>
            
        </div>
    );

}

export default Meal;