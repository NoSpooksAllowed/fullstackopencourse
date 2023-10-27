const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
