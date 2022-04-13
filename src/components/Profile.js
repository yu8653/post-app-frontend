import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostService from "../services/post";

const Profile = ({ currentUser, setPostID }) => {
  const navigate = useNavigate();
  let [postData, setPostData] = useState([]);
  useEffect(() => {
    if (currentUser) getPost();
  }, [currentUser]);

  const getPost = () => {
    PostService.getPost()
      .then((res) => {
        setPostData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editClickHandle = (postID) => {
    setPostID(postID);
    navigate("/profile/editpost");
  };
  const deleteClickHandle = (postID) => {
    let del = window.confirm("Delete the post?");
    if (!del) return;

    if (!currentUser) return;

    PostService.deletPost(postID)
      .then((res) => {
        alert(res.data);
        getPost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile">
      {!currentUser && <div className="msg">Login to view this page.</div>}
      {currentUser && (
        <section className="profile">
          <h2>This is {currentUser.user.username}'s profile</h2>
        </section>
      )}
      {currentUser && (
        <section className="post">
          {postData.map((post) => {
            return (
              <div className="post" key={post._id}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <p className="post-createdate">{post.date}</p>
                <div className="btn-group">
                  <button
                    className="btn-edit"
                    onClick={() => editClickHandle(post._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteClickHandle(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Profile;
