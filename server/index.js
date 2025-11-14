import express from "express";
import cors from "cors";
import { connectDB } from "./src/db.js";
import { signup, getCalories, getCalendar } from "./src/db/index.js";

const app = express();
app.use(cors());
app.use(express.json());


app.post("/api", (req, res)=>{
    console.log("sign up");
    signup(req.body, res);
});

app.get("/calories", (req, res)=>{
    getCalories(req.query, res)
});

app.get("/calendar", (req, res)=>{
    getCalendar(req.query);
});

app.listen(5000, ()=>{
    console.log("App on port 5000");
    connectDB();
})