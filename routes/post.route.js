import { Router } from "express";
import {
  addComment,
  getPosts,
  getSinglePost,
  makePost,
} from "../controllers/post.controller.js";
import authenticateToken from "../middleware/auth.js";

export const postRouter = Router();

postRouter.post("/", authenticateToken, makePost);
postRouter.get("/", getPosts);
postRouter.get("/:id", getSinglePost);

//for adding comments
postRouter.post("/comment/:id", authenticateToken, addComment);
