import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const signup = async ({name, surname, email, password, age, height, weight, start, end, wake, sleep}, res)=>{
    console.log("hi2");
    if(!name || !surname || !email || !password || !age || !height || !weight || !start || !end || !wake || !sleep){
        return res.status(400).json({error: "Proszę wypełnić wszystkie pola formularza."})
    }

    try{
        // sprawdzanie czy user istnieje
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({error: "Użytkownik już istnieje."});

        const hashed = await bcrypt.hash(password, 10);

        // tworzenie user
        const newUser = new User({name, surname, email, password: hashed, age, height, weight, start, end, wake, sleep});
        await newUser.save();

        console.log("hi3");
        res.status(201).json({message: "Konto utworzone."});
        console.log("hi4");
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error."});
    }
}