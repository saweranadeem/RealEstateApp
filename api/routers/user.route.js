import express from "express";
import {
  google,
  loginUser,
  signOut,
  signUpUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import {
  deleteLoginUser,
  getUserListings,
  updateUser,
} from "../controllers/user.controller.js";
// import { test } from "../controllers/user.controller.js";
// const userRouter = express.Router();
// userRouter.get("/test", test);

const authRouter = express.Router();
authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", loginUser);

authRouter.post("/updateLoginUser/:id", verifyToken, updateUser);
authRouter.delete("/deleteUser/:id", verifyToken, deleteLoginUser);
authRouter.get("/logOutuser", signOut);
authRouter.get("/listings/:id", verifyToken, getUserListings);
authRouter.post("/google", google);
export default authRouter;
