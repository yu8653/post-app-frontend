import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import "./styles/style.css";

const App = () => {
  let [currentUser, setCurrentUser] = useState("");
  let [postID, setPostID] = useState("");

  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/profile"
          element={<Profile currentUser={currentUser} setPostID={setPostID} />}
        ></Route>
        <Route
          path="/profile/editpost"
          element={<EditPost currentUser={currentUser} postID={postID} />}
        ></Route>
        <Route
          path="/profile/newpost"
          element={<NewPost currentUser={currentUser} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
