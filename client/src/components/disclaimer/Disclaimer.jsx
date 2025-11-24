const Disclaimer = ()=>{
    return(
        <div className="w-fit h-fit pt-3 pb-3 pl-5 pr-5 fixed bottom-1 bg-gray-900 text-white rounded-2xl">
            <p className='text-center'>
                <strong className='text-xl text-red-400'>Uwaga:</strong> To jest prototypowa aplikacja stworzona w szybszym tempie na potrzeby konkursu. Nie zapewnia pełnego bezpieczeństwa danych — nie używaj prawdziwych haseł ani wrażliwych informacji.
                <br/>
                Możesz swobodnie testować aplikację używając przykładowych danych.
            </p>
        </div>
    )
}

export default Disclaimer;