import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
export const updateUser = async (req, res, next) => {
  //if the id which is save in cookie is not equal to id of user
  if (req.user._id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }
  // console.log(req.user.id);
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // $set => if the data is being changed change it otherwise ignore the data
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        },
      },
      //it gives informattion of of updated user not previous one
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// console.log(errorHandler);
export const deleteLoginUser = async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("accessToken");
    res.status(200).json("User have been deleted");
  } catch (error) {
    next(error);
  }
};
export const getUserListings = async (req, res, next) => {
  if (req.user._id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};
