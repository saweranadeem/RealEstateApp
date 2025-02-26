import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routers/user.route.js";
import cookieParser from "cookie-parser";
connectDb();
const app = express();

app.listen(3000, () => {
  console.log("Server is Runing on 3000 port");
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
