import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://banner2.cleanpng.com/20180331/czw/avirs25a1.webp",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
