import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password_digest: { type: String, required: true, select: false },
  timestamps: true // Correct indentation
});

export default mongoose.model("users", UserSchema);


    