import express from "express";
import {
  createlist,
  deleteListing,
  getAllProperty,
  getList,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const listRouter = express.Router();
listRouter.post("/createLists", createlist);
listRouter.delete("/deleteList/:id", verifyToken, deleteListing);
listRouter.post("/updateList/:id", verifyToken, updateListing);
listRouter.get("/getLists/:id", getList);
listRouter.get("/getAllProperty", getAllProperty);
export default listRouter;
