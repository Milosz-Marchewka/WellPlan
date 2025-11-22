const Home = ()=>{
    const add = async ()=>{
        console.log("sup");
        try{
            const req = await fetch("http://localhost:5000/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "Test",
                    surname: "Subject1",
                    email: "testsubject1@gmail.com",
                    password: "password",
                    gender: "Male",
                    age: 1,
                    weight: 1,
                    height: 1
                })
            });
            if(!req.ok) console.log(await req.text());
        } catch(e){
            console.log(e);
        }
    }

    const del = ()=>{
        localStorage.removeItem("user");
    }

    const recipes = async ()=>{
        console.log("hi");
        try{
            const req = await fetch("http://localhost:5000/nutrition/meals?product=Spaghetti+N.5&calories=1600", {
                method: "GET"
            });
            console.log("hi2");
            if(!req.ok){
                console.log(await req.text());
            }
        } catch(e){
            console.log(e);
        }
    }
    
    return(
    <>
        <button onClick={add}>add user</button>
        <button onClick={del}>delete pseudosession lol</button>
        <br/>
        <button onClick={recipes} className="bg-white rounded p-6 cursor-pointer">please don't explode</button>
    </>)
}

export default Home;