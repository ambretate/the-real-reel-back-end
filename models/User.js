import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_digest: {
      type: String,
      required: true,
      select: false,
    },
    profilePicture: {
      type: Buffer,
      required: true,
    },
    following: [{ type: Schema.Types.ObjectId, ref: "users" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);
