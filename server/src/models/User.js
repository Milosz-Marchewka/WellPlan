import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    activityLevel: {type: Number, required: true},
    activities: {type: Object, required: false},
    training: {type: Object, required: false},
    schedule: {type: Object, required: false},
    eaten: {type: Object, required: false},
    wake: {type: Number, required: false},
    sleep: {type: Number, required: false}
});

// plan: {
//     '2025-05-11': {
//         stuff
//     }
// }

export const User = mongoose.model("user", userSchema);