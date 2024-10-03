import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

userRouter.put("/:id", updateUser);

export default userRouter;
