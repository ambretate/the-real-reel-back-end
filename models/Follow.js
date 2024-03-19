import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    userId_follower: [{ type: Schema.Types.ObjectId, ref: "user"}],
    userId_following: [{ type: Schema.Types.ObjectId, ref: "user"}]
});

export default mongoose.model("follows", FollowSchema);