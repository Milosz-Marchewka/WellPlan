import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { emailRegex, passwordRegex } from "../util/regex.js";

// {name, surname, email, password, age, height, weight, start, end, wake, sleep, activity, schedule}
export const signup = async (body, res)=>{
    try{
        if([body.name, body.surname, body.email, body.password, body.gender, body.age, body.height, body.weight, body.activityLevel].some((v)=>!v)){
            return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."});
        }

        
        // sprawdzanie czy user istnieje
        // const existing = await User.findOne({email: body.email});
        // if(existing){
        //     return res.status(400).json({error: "Taki użytkownik już istnieje."});
        // }

        console.log('b');

        if(!emailRegex(body.email)) return res.status(400).json({error: "Niepoprawny email."});
        if(body.password != null){
            var hashed = await bcrypt.hash(body.password, 10);
        }
        if(!passwordRegex(body.password)) return res.status(400).json({error: "Hasło powinno zawierać co najmniej 8 znaków, jedną literę, jedną cyfrę oraz jeden znak specjalny."});

        // tworzenie user

        const userObj = {
            name: body.name.trim(),
            surname: body.surname.trim(),
            email: body.email.trim(),
            password: hashed,
            gender: body.gender,
            age: body.age,
            height: body.height,
            weight: body.weight,
            activityLevel: body.activityLevel,
            activities: {},
            training: {},
            ...(body?.schedule && {schedule: body?.schedule})
        }


        const newUser = new User(userObj);
        await newUser.save();
        
        const {password, ...safe} = userObj;
        return res.status(201).json(safe);
    } catch(err){
        console.log(err.message);
        return res.status(500).json({error: "Błąd serwera."});
    }
}