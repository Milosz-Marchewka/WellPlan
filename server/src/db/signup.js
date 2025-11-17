import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { emailRegex } from "../util/regex.js";

// {name, surname, email, password, age, height, weight, start, end, wake, sleep}
export const signup = async (body, res)=>{
    console.log("hi");
    try{
        
        if([body.name, body.surname, body.email, body.password, body.gender, body.age, body.height, body.weight].some((v)=>!v)){
            return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
        }

        body.name.trim();
        body.surname.trim();
        body.password.trim();
        body.email.trim();
        
        // sprawdzanie czy user istnieje
        const existing = await User.findOne({email: body.email});
        if(existing){
            return res.status(400).json({error: "Taki użytkownik już istnieje."});
        }

        if(!emailRegex(body.email)) return res.status(400).json({error: "Niepoprawny email."});

        if(body.password != null){
            var hashed = await bcrypt.hash(body.password, 10);
        }

        // tworzenie user
        const newUser = new User({name: body.name, surname: body.surname, email: body.email, password: hashed, gender: body.gender, age: body.age, height: body.height, weight: body.weight});
        await newUser.save();
        return res.status(201).json({message: "Konto utworzone."});
    } catch(err){
        console.log(err.message);
        return res.status(500).json({error: "Błąd serwera."});
    }
}