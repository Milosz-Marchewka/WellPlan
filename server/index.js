import express from "express";
import cors from "cors";
import { connectDB } from "./src/db.js";
import { signup, login, getCalendar, addActivity, getMacronutrients, getMeals, getTraining, addTraining, update, addEaten, getEaten } from "./src/db/index.js";

const app = express();
app.use(cors());
app.use(express.json());
connectDB();


app.post("/signup", (req, res)=>{
    signup(req.body, res);
});

app.post("/login", (req,res)=>{
    login(req.body, res);
})

app.get("/nutrition/macronutrients", (req, res)=>{
    getMacronutrients(req.query, res);
});

app.get("/nutrition/meals", (req, res)=>{
    getMeals(req.query, res);
});

app.post("/nutrition/add", (req, res)=>{
    addEaten(req.body, res);
});

app.get("/nutrition/get", (req, res)=>{
    getEaten(req.query, res);
});

app.get("/calendar/get", (req, res)=>{
    getCalendar(req.query, res);
});

app.post("/calendar/add", (req, res)=>{
    addActivity(req.body, res);
});

app.get("/training/get", (req, res)=>{
    getTraining(req.query, res);
});

app.post("/training/add", (req, res)=>{
    addTraining(req.body, res);
});

app.post("/update", (req, res)=>{
    update(req.body, res);
});


export default app;