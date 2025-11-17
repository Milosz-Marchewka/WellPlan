import express from "express";
import cors from "cors";
import { connectDB } from "./src/db.js";
import { signup, login, getCalories, getCalendar, addActivity, getMacronutrients } from "./src/db/index.js";

const app = express();
app.use(cors());
app.use(express.json());


app.post("/signup", (req, res)=>{
    console.log("hi!");
    signup(req.body, res);
});

app.post("/login", (req,res)=>{
    login(req.body, res);
})

app.get("/nutrition", (req, res)=>{
    getMacronutrients(req.query, res);
});

app.get("/calories", (req, res)=>{
    getCalories(req.query, res)
});

app.get("/calendar/get", (req, res)=>{
    getCalendar(req.query, res);
});

app.post("/calendar/add", (req, res)=>{
    addActivity(req.body, res);
});

app.listen(5000, ()=>{
    console.log("App on port 5000");
    connectDB();
})