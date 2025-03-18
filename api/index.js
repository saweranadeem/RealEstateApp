import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routers/user.route.js";
import listRouter from "./routers/listing.route.js";
import cookieParser from "cookie-parser";
import imageRoute from "./routers/image.route.js";
connectDb();
const app = express();

app.listen(3000, () => {
  console.log("Server is Runing on 3000 port");
});
app.use(express.json());
app.use(cookieParser());
//data come from fronetend is formData to parse the formData we use this middleware

app.use(express.urlencoded({ extended: false }));
//  Serve files from the "uploads" folder
app.use("/uploads", express.static("uploads"));
app.use("/api/uploads", imageRoute);

app.use("/api/user", authRouter);
app.use("/api/list", listRouter);
//Errorhandling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
