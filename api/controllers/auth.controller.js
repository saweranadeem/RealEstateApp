import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // Correct import
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
// Sign Up Function
export const signUpUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created Successfully" });
  } catch (error) {
    next(error);
  }
};

// Login Function
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Compare the hashed password
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Credentials are not valid" });
    }
    // res.status(200).json({ message: "Login Successful" });
    const token = jwt.sign({ _id: validUser._id }, process.env.SECRET_KEY);
    // console.log("SECRET_KEY:", process.env.SECRET_KEY);

    //we dont want to send password back to the user soo here we distrcurethe vluees
    const { password: _password, ...userInfo } = validUser._doc;

    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "User Login Successfully",
      user: userInfo,
    });
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const { email, userName, photo } = req.body;

    let findUser = await User.findOne({ email });

    if (findUser) {
      const token = jwt.sign({ _id: findUser._id }, process.env.SECRET_KEY);
      const { password: _password, ...userInfo } = findUser._doc;

      return res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          message: "User Logged In Successfully",
          user: userInfo,
        });
    }

    const generatedPassword = Math.random().toString(36).slice(-16);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = new User({
      userName:
        userName.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email,
      password: hashedPassword,
      avatar: photo, // Fixed typo: "avator" → "avatar"
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY);
    const { password: _password, ...userInfo } = newUser._doc;

    return res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "User Created Successfully",
        user: userInfo,
      });
  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
