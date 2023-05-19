import * as env from "dotenv";
import mongoose from "mongoose";
env.config();
const connect = async () => {
  try {
    const response = mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export default connect;
