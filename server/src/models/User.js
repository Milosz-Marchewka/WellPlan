import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    start: {type: Object, required: true},
    end: {type: Object, required: true},
    wake: {type: Number, required: true},
    sleep: {type: Number, required: true},
});

export const User = mongoose.model("user", userSchema);