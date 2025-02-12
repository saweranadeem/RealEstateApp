import express from "express";
import connectDb from "./config/db.js";
connectDb();
const app = express();
app.listen(3000, () => {
  console.log("Server is Runing on 3000 port");
});
