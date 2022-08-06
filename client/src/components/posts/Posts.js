import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

const Posts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/signin");
    }
  }, [])

  return (
    <div>Posts</div>
  )
}

export default Posts;