import { Schema, model } from "mongoose";
const commentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("comment", commentSchema);
