import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const returnedBlog = await blogService.createBlog({
        title,
        author,
        url,
      });

      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(returnedBlog));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Author"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlog;
