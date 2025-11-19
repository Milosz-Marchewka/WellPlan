
const Meal = ({imgUrl, title, prepTime, prepDifficulty, macronutrients}) => {
    

    return(
        <div className="h-50 bg-gray-900 text-white flex w-full items-center overflow-hidden gap-5 rounded-3xl p-3">
            <div className="h-full w-full flex-1 overflow-hidden flex items-center rounded-2xl">
                <img src={imgUrl} alt={imgUrl} className="w-full h-full"/>
            </div>
            <div className="flex-3 h-full">
                <p className="text-sm text-emerald-500">Śniadanie</p>
                <div className="text-center text-3xl h-fit flex items-center justify-between px-2 pb-2 border-b border-b-emerald-400">
                    <div>
                        <h3 className="inline-block">{title}</h3>
                        <div className="inline-block text-sm mx-3 text-gray-300">
                            🕑{prepTime}🧑‍🍳Łatwe
                        </div>
                    </div>
                    <p className="text-sm">Pokaż Przepis</p>
                </div>
                <div className="flex text-center h-45 pt-2">
                    <div className="flex-2 text-left">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium hic tempora, ducimus veniam tenetur dolore iusto, tempore fugiat corporis eum dolores, et minus deserunt quam at molestiae. In, tenetur accusamus.</p>
                    </div>
                    <div className="basis-1/3 grid grid-cols-2 grid-rows-2 justify-center h-28">
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