import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiTwotoneDelete } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';

import { deleteComment, getPost } from '../../redux/actions/post';

const CommentItem = ({ comment, postId }) => {
  const dispatch = useDispatch();

  const onDeleteClick = async () => {
    const res = await dispatch(deleteComment(postId, comment._id));

    if (res === 0) {
      dispatch(getPost(postId));
    }
  }

  const { user } = useSelector(s => s.auth);

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <NavLink to={`/post/${comment._id}`}>
            <Avatar
              shape="square"
              id="image"
              className="img-preview"
              src={`../../${comment.image}`}
            />
          </NavLink>
        </div>

        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                className="rounded-circle d-md-block avatar-size"
                src={`../../${comment.avatar}`}
                alt="avatar"
              />
              <span className="ms-2">{comment.name}</span>
            </div>

            {comment.user === user._id ? (
              <div
                onClick={onDeleteClick}
                className="text-danger fs-4 del-btn"
              >
                <AiTwotoneDelete />
              </div>
            ) : null}
          </div>

          <p className="lead">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
