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

afterAll(async () => {
  await mongoose.connection.close();
});
