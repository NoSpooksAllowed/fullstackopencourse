const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);
const auth = {};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }

  auth.user = await User.findOne({});

  for (let blog of helper.initialBlogPosts) {
    let blogObject = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: auth.user,
      likes: blog.likes || 0,
    });
    await blogObject.save();
    auth.user.blogs.push(blogObject._id);

    await auth.user.save();
  }

  auth.token = await helper.getJWTToken(auth.user);
}, 100000);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", "Bearer " + auth.token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("all blogs are returned", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", "Bearer " + auth.token);

  expect(response.body).toHaveLength(helper.initialBlogPosts.length);
});

test("test that id property is defined", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", "Bearer " + auth.token);

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
    user: auth.user,
    likes: 120,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", "Bearer " + auth.token)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("Goblin's anecdotes");
}, 100000);

test("verifies if likes property absent it will set to zero", async () => {
  const newBlog = {
    title: "Goblin's anecdotes",
    author: "Puchkov",
    url: "https://oper.ru",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", "Bearer " + auth.token)
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

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", "Bearer " + auth.token)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length);
});

test("succeeds with status code 200 and if blogs are the same", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const newBlog = {
    title: "Hello",
    author: "Lena",
    url: "https://ya.ru",
    user: auth.user._id,
    likes: 1,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .set("Authorization", "Bearer " + auth.token)
    .expect(200);
  const blogsAfterUpdate = await helper.blogsInDb();
  delete blogsAfterUpdate[0].id;

  expect(blogsAfterUpdate[0]).toStrictEqual(newBlog);
});

test("returns 403 if wrong user trying to update not his own blog", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const newBlog = {
    title: "Hello",
    author: "Lena",
    url: "https://ya.ru",
    user: auth.user._id,
    likes: 1,
  };

  const lastUser = await User.findOne({}).sort({ _id: -1 }).limit(1);
  const token = await helper.getJWTToken(lastUser);

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .set("Authorization", "Bearer " + token)
    .expect(403);
});

test("succeeds with status code 204 if id is valid", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", "Bearer " + auth.token)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length - 1);

  const titles = blogsAtEnd.map((b) => b.id);

  expect(titles).not.toContain(blogToDelete.id);
});

test("returns with status code 403 if wrong user trying to delete not his own blog", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  const lastUser = await User.findOne({}).sort({ _id: -1 }).limit(1);
  const token = await helper.getJWTToken(lastUser);

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", "Bearer " + token)
    .expect(403);
});

afterAll(async () => {
  await mongoose.connection.close();
}, 100000);
