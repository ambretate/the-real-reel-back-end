import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ReviewSchema = new Schema(
  {
    userID: [{ type: Schema.Types.ObjectId, ref: "users" }],
    movieID: [{ type: Schema.Types.ObjectId, ref: "movies" }],
    title: { type: String, required: true },
    review: { type: String, required: true },
    hasSpoilers: { type: Boolean },
  },
  { timestamps: true }
);

export default mongoose.model("reviews", ReviewSchema);
