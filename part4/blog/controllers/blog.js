const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

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
    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user,
      likes: body.likes || 0,
    });

    const result = await blog.save();

    const userWithoutBlogs = {
      ...user.toJSON(),
      blogs: undefined,
    };

    user.blogs.push(blog._id);

    await user.save();

    response.status(201).json({
      ...result.toJSON(),
      user: userWithoutBlogs,
    });
  } catch (error) {
    next(error);
  }
});

blogRouter.put(
  "/:id",
  middleware.checkUserBlogOwnership,
  async (request, response, next) => {
    try {
      const body = request.body;
      const user = request.user;

      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        user: user,
        likes: body.likes || 0,
      };
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        {
          new: true,
        }
      ).populate("user", "-blogs");
      response.json(updatedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.delete(
  "/:id",
  middleware.checkUserBlogOwnership,
  async (request, response, next) => {
    try {
      const user = request.user;

      await User.findByIdAndUpdate(
        user._id,
        {
          $pull: { blogs: request.params.id },
        },
        { new: true }
      );

      await Blog.findByIdAndRemove(request.params.id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = blogRouter;
