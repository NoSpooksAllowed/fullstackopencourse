const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const blogWithMostLikes = blogs.reduce((maxLikesBlog, blog) => {
    return blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog;
  }, blogs[0]);

  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const groupedByAuthor = _.groupBy(blogs, "author");

  const authorCounts = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));

  const topAuthor = _.maxBy(authorCounts, "blogs");

  return topAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const groupedByAuthor = _.groupBy(blogs, "author");

  const authorCounts = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    likes: blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0),
  }));

  const topAuthor = _.maxBy(authorCounts, "likes");

  return topAuthor;
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  getTokenFrom,
};
