const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogPosts) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
}, 100000);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogPosts.length);
});

test("test that id property is defined", async () => {
  const response = await api.get("/api/blogs");

  const blogs = response.body;

  for (let blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Goblin's anecdotes",
    author: "Puchkov",
    url: "https://oper.ru",
    likes: 120,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length + 1);

  const titles = blogsAtEnd.map(blog => blog.title);
  expect(titles).toContain("Goblin's anecdotes");
}, 100000);

test("verifies if likes propery absent it will set to zero", async () => {
  const newBlog = {
    title: "Goblin's anecdotes",
    author: "Puchkov",
    url: "https://oper.ru",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blog = await helper.getLastBlog();

  expect(blog.likes).toBeDefined();
  expect(blog.likes).toEqual(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
