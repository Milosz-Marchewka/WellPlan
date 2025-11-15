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
    
    return(
    <>
        <button onClick={add}>add user</button>
        <button onClick={del}>delete pseudosession lol</button>
    </>)
}

export default Home;