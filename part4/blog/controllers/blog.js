const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", "-blogs");

    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const user = await User.findOne();

    if (user === null) {
      throw new Error("did not find user");
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user,
      likes: body.likes || 0,
    });

    const result = await blog.save();

    user.blogs.push(blog._id);

    await user.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;
    const user = await User.findOne();

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      user: user,
      likes: body.likes || 0,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
