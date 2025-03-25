import { type } from "express/lib/response";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    profilePicutre: {
        type: String,
        default: "",
    },
    bannerImg: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "ArrumaAI User",
    },
    skills: [String],
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    education: [
        {
            school: String,
            fieldOfStudy: String,
            startYear: Number,
            endYear: Number,
        },
    ],
    connections: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
}, { timestamp: true });

const User = mongoose.model("User", userSchema);

export default User;