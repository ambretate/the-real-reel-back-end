import mongoose from "mongoose";

const Schema = mongoose.Schema

let UserSchema = new Schema(
    {
        username: String,
        required: true,
    },
        email: { type: String, required: true},
        password_digest: { type: String, required: true, select: false },
        { timestamps: true }
    );

    export default mongoose.model("users", UserSchema)