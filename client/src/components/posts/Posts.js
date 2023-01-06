import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';

import { loadPosts } from '../../redux/actions/post';

import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';

import isEmpty from '../../utils/is-empty';

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { posts, loading } = useSelector(s => s.post);

  let postsContent;

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/signin");
    }

    dispatch(loadPosts());
  }, []);

  // useEffect(() => {
  //   if (isEmpty(posts) || loading) {
  //     postsContent = <Spinner />;
  //   } else {
  //     postsContent = <PostFeed posts={posts} />;
  //   }
  // }, [posts]);

  if (isEmpty(posts) || loading) {
    postsContent = <Spinner />;
  } else {
    postsContent = <PostFeed />;
  }

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postsContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts;