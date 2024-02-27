const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogPosts = [
  {
    title: "Hello",
    author: null,
    url: "https://ya.ru",
    likes: 10,
  },
  {
    title: "Uraa",
    author: null,
    url: "https://google.com",
    likes: 111,
  },
];

const initialUsers = [
  {
    username: "kommunist",
    name: "Stas Ai Kak Prosto",
    password: "raketa666",
  },

  {
    username: "zhopa",
    name: "Dmitry Puchkov",
    password: "raketa666",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "1",
    author: "1",
    url: "https://ya.ru",
    likes: 1,
  });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

const getLastBlog = async () => {
  const blog = await Blog.findOne().sort({ field: "asc", _id: -1 });

  return blog.toJSON();
};

module.exports = {
  initialBlogPosts,
  nonExistingId,
  blogsInDb,
  getLastBlog,
  initialUsers,
  usersInDb,
};
