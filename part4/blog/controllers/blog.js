const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  try {
    const body = request.body;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    const result = await blog.save();

    response.status(201).json(result);
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
  } catch (error) {
    response.status(404).send({ error: error.message });
  }
});

module.exports = blogRouter;
