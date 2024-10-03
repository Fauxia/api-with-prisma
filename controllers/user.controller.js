import prisma from "../db/db.js";
import { errorHandler } from "../utils/error.js";
import generateToken from "../utils/generateToken.js";

const createUser = async (req, res, next) => {
  const body = req.body;
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (findUser) {
      return next(errorHandler("Email already exists"));
    }
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return res.json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const token = generateToken(user.id);
  res.json({ token });
};

const updateUser = async (req, res, next) => {
  const body = req.body;
  const userId = req.params.id;
  const findUser = await prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: body,
  });
  if (!findUser) return next(errorHandler("Invalid id"));
  return res.json({ success: true, message: "User created" });
};

export { createUser, updateUser, loginUser };
