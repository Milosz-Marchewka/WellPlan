import RadialProgress from "./RadialProgress";

const Statistic = ({user}) => {

    return(
        <div className="bg-gray-900 text-emerald-500 text-4xl text-center rounded-3xl w-full overflow-hidden">
            <h2 className="py-5 text-2xl">Dzisiejsza dieta</h2>
            <div className="flex justify-between p-5 text-white text-xl bg-gray-800">
                <div className="flex-1 flex flex-col align-items">
                    <h4 className="mb-2">Kalorie:</h4>
                    <RadialProgress percentage={65} color="lime"/>
                </div>
                <div className="flex-1">
                    <h4 className="mb-2">Białko:</h4>
                    <RadialProgress percentage={73} color="cyan"/>
                </div>
                <div className="flex-1">
                    <h4 className="mb-2">Tłuszcze:</h4>
                    <RadialProgress percentage={60} color="yellow"/>
                </div>
                <div className="flex-1">
                    <h4 className="mb-2">Węglowodany:</h4>
                    <RadialProgress percentage={50} color="lightcoral"/>
                </div>
            </div>
        </div>
    );
}

export default Statistic;