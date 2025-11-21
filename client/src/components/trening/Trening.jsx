import TreningDay from "./TreningDay";

const Trening = () => {

    return(
        <div>
            <div className="flex items-center justify-center min-h-screen flex-wrap gap-5">
                <TreningDay 
                day="Poniedziałek" 
                type="Push" 
                exercises={[
                    ["Wyciskanie sztangi na ławce poziomej", 4, "6–8"],
                    ["Wyciskanie hantli na skosie dodatnim", 3, "8–10"],
                    ["Pompki na poręczach (dipy)", 3, "6–10"],
                    ["Wyciskanie sztangi nad głowę (OHP)", 4, "5–8"],
                    ["Unoszenie hantli bokiem", 3, "12–15"],
                    ["Prostowanie ramion na wyciągu (triceps)", 3, "10–12"]
                ]}
                />
                <TreningDay 
                day="Środa" 
                type="Pull" 
                exercises={[
                    ["Podciąganie nachwytem", 4, "max 6–10"],
                    ["Wiosłowanie sztangą", 4, "6–8"],
                    ["Ściąganie drążka wyciągu do klatki", 3, "10–12"],
                    ["Wiosłowanie hantlem", 3, "8–10"],
                    ["Face pull", 3, "12–15"],
                    ["Uginanie ramion ze sztangą", 3, "8–12"]
                ]}
                />
                <TreningDay 
                day="Piątek" 
                type="Legs" 
                exercises={[
                    ["Przysiady ze sztangą", 4, "5–8"],
                    ["Martwy ciąg na prostych nogach (RDL)", 3, "6–10"],
                    ["Wykroki z hantlami", 3, "10–12 na stronę"],
                    ["Odwodzenie nóg na maszynie", 3, "12–15"],
                    ["Uginanie nóg leżąc (dwugłowe)", 3, "10–12"],
                    ["Wspięcia na palce stojąc", 4, "12–15"]
                ]}
                />

                <div className="flex flex-col items-center gap-3 w-60">
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