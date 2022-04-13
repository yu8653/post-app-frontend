import axios from "axios";
const API_URL = "https://post-route.herokuapp.com/api/post";

class PostService {
  getPost() {
    let user = this.getCurrentUser();
    if (!user) return;

    return axios.get(API_URL, {
      headers: {
        Authorization: user.token,
      },
    });
  }

  newPost(title, content) {
    let user = this.getCurrentUser();
    if (!user) return;

    return axios.post(
      API_URL,
      {
        title,
        content,
        user,
      },
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
  }

  getPostbyID(postid) {
    let user = this.getCurrentUser();
    if (!user) return;

    return axios.get(`${API_URL}/${postid}`, {
      headers: {
        Authorization: user.token,
      },
    });
  }

  updatePost(id, title, content) {
    let user = this.getCurrentUser();
    if (!user) return;

    return axios.patch(
      `${API_URL}/${id}`,
      { user, title, content },
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
  }

  deletPost(id) {
    let user = this.getCurrentUser();
    if (!user) return;

    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: user.token,
      },
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new PostService();
