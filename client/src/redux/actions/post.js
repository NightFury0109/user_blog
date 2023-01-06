import { createSlice } from "@reduxjs/toolkit";

import api from '../../utils/api';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

const post = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { setPosts, setPost, setLoading } = post.actions;

export const createPost = (postData) => {
  return async dispatch => {
    try {
      const res = await api.post('/posts', postData);
      console.log("Successfully posted");
      return 0;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export const makeComment = (postId, commentData) => {
  return async dispatch => {
    try {
      const res = await api.post(`/posts/comment/${postId}`, commentData);
      console.log("Successfully commented");
      return 0;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export const deletePost = (postID) => {
  return async dispatch => {
    try {
      const res = await api.delete(`/posts/${postID}`);
      console.log("Successfully removed");
      return 0;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export const deleteComment = (postID, commentId) => {
  return async dispatch => {
    try {
      const res = await api.delete(`/posts/comment/${postID}/${commentId}`);
      console.log("Comment successfully removed");
      return 0;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export const loadPosts = () => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      const res = await api.get('/posts');
      console.log(res.data)
      dispatch(setPosts(res.data));
      dispatch(setLoading(false));
      return 0;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export const getPost = (postId) => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      const res = await api.get(`/posts/${postId}`);

      dispatch(setPost(res.data));
      dispatch(setLoading(false));
      return 0;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export default post.reducer;