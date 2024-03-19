import React, { useState } from "react";
import { useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import Logout from "./Logout";
import CreateBlog from "./CreateBlog";
import Notification from "./Notification";

const BlogLayout = ({ user, setUser, blogs, setBlogs, username }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  const [notifyMessage, setNotifyMessage] = useState(null);

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notifyMessage} />
      <p>
        {username} logged in <Logout user={user} setUser={setUser} />
      </p>
      <CreateBlog
        blogs={blogs}
        setBlogs={setBlogs}
        setMessage={setNotifyMessage}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogLayout;
