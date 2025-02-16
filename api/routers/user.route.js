import express from "express";
import { loginUser, signUpUser } from "../controllers/auth.controller.js";
// import { test } from "../controllers/user.controller.js";
// const userRouter = express.Router();
// userRouter.get("/test", test);

const authRouter = express.Router();
authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", loginUser);
export default authRouter;
