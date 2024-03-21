import mongoose from "mongoose";

const Schema = mongoose.Schema;

let GenreSchema = new Schema ({
    "id": { type: Number },
    "genre": { type: String },
        
})

export default mongoose.model("genres", GenreSchema);