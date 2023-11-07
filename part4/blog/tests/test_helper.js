const Blog = require("../models/blog");

const initialBlogPosts = [
  {
    title: "Hello",
    author: "Lena",
    url: "https://ya.ru",
    likes: 10,
  },
  {
    title: "Uraa",
    author: "Vasya",
    url: "https://google.com",
    likes: 111,
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

  return blogs.map(blog => blog.toJSON());
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
};
