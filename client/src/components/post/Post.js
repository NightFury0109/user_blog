import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';

import { getPost } from '../../redux/actions/post';

const Post = () => {
  const { post, loading } = useSelector(s => s.post);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let postContent;

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/signin");
    }

    dispatch(getPost(postId));
  }, []);

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );
  }

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-start">
            <NavLink to="/posts" className="text-success fs-3">
              <BsFillArrowLeftCircleFill />
            </NavLink>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
