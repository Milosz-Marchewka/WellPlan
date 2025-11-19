
const RadialProgress = ({percentage, color}) => {
    
    const style = {
        borderRadius: "50%",
        background: `conic-gradient(${color} ${percentage*3.6}deg, rgba(100,100,120,0.5) 0deg)`,
    }
    
    return(

        <div className="w-full flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center" style={style}>
                <div className="w-14 h-14 bg-gray-900 rounded-[50%] ">


                </div>
            </div>
        </div>

    );
}

export default RadialProgress;