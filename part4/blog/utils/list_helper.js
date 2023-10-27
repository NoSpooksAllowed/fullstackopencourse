const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0);
};

const favoriteBlog = blogs => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
