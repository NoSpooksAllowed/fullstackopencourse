const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  try {
    if (!("likes" in request.body)) {
      request.body.likes = 0;
    }
    const blog = new Blog(request.body);

    const result = await blog.save();

    response.status(201).json(result);
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
});

module.exports = blogRouter;
