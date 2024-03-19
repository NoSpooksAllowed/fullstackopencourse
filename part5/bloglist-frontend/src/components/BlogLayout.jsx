import React from "react";
import { useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";

const BlogLayout = ({ blogs, setBlogs, username }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogLayout;
