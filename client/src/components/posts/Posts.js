import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import PostForm from './PostForm';

const Posts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/signin");
    }
  }, [])

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts;