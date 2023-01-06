import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
import { AiTwotoneDelete } from 'react-icons/ai';

import { deletePost, loadPosts } from '../../redux/actions/post';

const PostItem = ({ post }) => {
  const { user } = useSelector(s => s.auth);
  const dispatch = useDispatch();

  const onDelete = async () => {
    const res = await dispatch(deletePost(post._id));

    if (res === 0) dispatch(loadPosts());
  }

  // const handleGetPost = async () => {
  //   dispatch(getPost(post._id));
  // }

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <NavLink to={`/post/${post._id}`}>
            <Avatar
              shape="square"
              id="image"
              className="img-preview"
              src={`../../../${post.image}`}
            />
          </NavLink>
        </div>

        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                className="rounded-circle d-md-block avatar-size"
                src={`../../../${post.avatar}`}
                alt="avatar"
              />
              <span className="ms-2">{post.name}</span>
            </div>

            {post.user === user._id ? (
              <div
                onClick={onDelete}
                className="text-danger fs-4 del-btn"
              >
                <AiTwotoneDelete />
              </div>
            ) : null}
          </div>

          <p className="lead text-start">{post.text}</p>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
