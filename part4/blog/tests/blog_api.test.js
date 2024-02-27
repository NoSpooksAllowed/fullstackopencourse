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

  const titles = blogsAtEnd.map((blog) => blog.title);
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

test("blog without url and title is not added", async () => {
  const newBlog = {
    author: "Puchkov",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length);
});

test("succeeds with status cod 200 and if blogs are the same", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const newBlog = {
    title: "Hello",
    author: "Lena",
    url: "https://ya.ru",
    likes: 1,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);
  const blogsAfterUpdate = await helper.blogsInDb();
  delete blogsAfterUpdate[0].id;
  console.log(blogsAfterUpdate[0]);

  expect(blogsAfterUpdate[0]).toStrictEqual(newBlog);
});

test("succeeds with status code 204 if id is valid", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length - 1);

  const titles = blogsAtEnd.map((b) => b.id);

  expect(titles).not.toContain(blogToDelete.id);
});

afterAll(async () => {
  await mongoose.connection.close();
}, 100000);
