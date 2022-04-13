import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post";

const NewPost = ({ currentUser }) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [message, setMessage] = useState("");

  const titleChangeHandle = (e) => {
    setTitle(e.target.value);
  };
  const contentChangeHandle = (e) => {
    setContent(e.target.value);
  };

  const postHandle = () => {
    PostService.newPost(title, content)
      .then((res) => {
        alert("New post has been created.");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };

  return (
    <>
      {!currentUser && <div>Log in to view this page.</div>}
      {currentUser && (
        <div className="new-post">
          {message && <div className="alert">{message}</div>}
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input onChange={titleChangeHandle} type="text" name="title" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                onChange={contentChangeHandle}
                type="text"
                name="content"
              ></textarea>
            </div>
            <br />
            <div className="form-group">
              <button onClick={postHandle}>
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
