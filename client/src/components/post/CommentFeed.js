import React from 'react';

import CommentItem from './CommentItem';

const CommentFeed = ({ postId, comments }) => {
  return comments.map(comment => (
    <CommentItem key={comment._id} comment={comment} postId={postId} />
  ));
}

export default CommentFeed;
