import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.route.js";
import { postRouter } from "./routes/post.route.js";

const app = express();

config();

app.use(express.json());

app.use("/api", userRouter);

app.use("/api/post", postRouter);

app.use((err, req, res, next) => {
  res.json({
    success: false,
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
