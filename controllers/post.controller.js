import prisma from "../db/db.js";

const makePost = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        author: { connect: { id: req.user.userId } },
      },
    });
    res.json({ post });
  } catch (error) {
    console.log(error.message);
    // next(error);
    res.json({ message: "not" });
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
    });
    await prisma.post.create({});
    res.json({ data: posts });
  } catch (error) {
    next(error);
  }
};

const getSinglePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: { select: { name: true } },
        comments: { include: { author: { select: { name: true } } } },
      },
    });
    res.json({ data: post });
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  const postId = req.params.id;
  const { content } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: req.user.userId } },
        post: { connect: { id: parseInt(postId) } },
      },
    });
    res.json({ data: comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { makePost, getPosts, getSinglePost, addComment };
