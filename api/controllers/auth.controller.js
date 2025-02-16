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

    res.status(201).json({success:true, message: "User created Successfully" });
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
      return res.status(400).json({ message: "Invalid Password" });
    }
    // res.status(200).json({ message: "Login Successful" });
    const token = jwt.sign({ _id: validUser._id }, process.env.SECRET_KEY);
    // console.log("SECRET_KEY:", process.env.SECRET_KEY);

    //we dont want to send password back to the user soo here we distrcurethe vluees
    const { password: _password, ...userInfo } = validUser._doc;

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      // .json({ message: "user login successfully" });
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};
