import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post";

const EditPost = ({ currentUser, postID }) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    PostService.getPostbyID(postID)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        setMessage(err.data);
      });
  }, [postID]);

  const titleChangeHandle = (e) => {
    setTitle(e.target.value);
  };
  const contentChangeHandle = (e) => {
    setContent(e.target.value);
  };

  const updateHandle = () => {
    PostService.updatePost(postID, title, content)
      .then((res) => {
        alert("Post has been updated.");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };

  return (
    <div className="edit-post">
      {!currentUser && <div className="msg">Log in to view this page.</div>}
      {message && <div className="alert">{message}</div>}
      {currentUser && (
        <div className="edit">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              onChange={titleChangeHandle}
              value={title}
              type="text"
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              onChange={contentChangeHandle}
              value={content}
              type="text"
              name="content"
            />
          </div>
          <div className="form-group">
            <button onClick={updateHandle}>Update Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;
