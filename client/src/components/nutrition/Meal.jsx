
const prepDifficultyToText = (value) => {
    switch(value){
        case 0:
            return "Łatwe";
        case 1:
            return "Średnie";
        case 2:
            return "Trudne";
    }
}

const Meal = ({imgUrl, title, ingredients, macronutrients}) => {
    

    return(
        <div className="min-h-70 lg:min-h-50 h-fit bg-gray-900 text-white flex w-full items-center overflow-hidden gap-5 rounded-3xl p-3">
            <div className="h-50 w-full flex-1 overflow-hidden flex items-center rounded-2xl">
                <img src={imgUrl} alt={imgUrl} className="w-full h-full"/>
            </div>
            <div className="flex-3 h-full">
                <p className="text-sm text-emerald-500">Śniadanie</p>
                <div className="text-center text-xl h-fit flex items-center justify-between px-2 pb-2 border-b border-b-emerald-400">
                    <div>
                        <h3 className="inline-block">{title}</h3>
                        <div className="inline-block text-sm mx-3 text-gray-300">
                        </div>
                    </div>
                    <p className="text-sm">Pokaż Przepis</p>
                </div>
                <div className="flex h-40 text-center flex-col lg:flex-row lg:h-25 pt-2">
                    <div className="flex-2 text-left h-30 lg:h-35 overflow-clip mask-b-from-1% mask-b-to-70%">
                        {ingredients}
                    </div>
                    <div className="basis-1/3 flex justify-around lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:justify-center h-28">
                        <div className="text-green-500"><h4 className="text-sm">Kalorie:</h4><p className="inline-block text-2xl">{macronutrients.calories}</p>kcal</div>
                        <div className="text-blue-500"><h4 className="text-sm">Białko:</h4><p className="inline-block text-2xl">{macronutrients.protein}</p>g</div>
                        <div className="text-yellow-500"><h4 className="text-sm">Tłuszcze:</h4><p className="inline-block text-2xl">{macronutrients.fat}</p>g</div>
                        <div className="text-red-500"><h4 className="text-sm">Węglowodany:</h4><p className="inline-block text-2xl">{macronutrients.carbs}</p>g</div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Meal;