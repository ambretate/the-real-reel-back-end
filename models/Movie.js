import mongoose from "mongoose";

const Schema = mongoose.Schema

let MovieSchema = new Schema({
    "title": { type: String },
    "genre": { type: Schema.Types.Number, ref: "genre" },
    "image": { type: String },
    "description": { type: String },
    "releaseDate": { type: String },
    "runtime": { type: String },
    "budget": { type: String }
})

export default mongoose.model("movies", MovieSchema)
