import { model, Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  cover: {
    type: String,
    default:
      "https://images.pexels.com/photos/2599245/pexels-photo-2599245.jpeg?auto=compress&cs=tinysrgb&w=1600",
    required: true,
  },
  date: {
    type: String,
    default: () => new Date(),
  },
  excerpt: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  topic: {
    type: String,
    required: true,
  },
});
export default model("post", postSchema);
