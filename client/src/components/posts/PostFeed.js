import React from 'react';
import { useSelector } from 'react-redux';

import PostItem from './PostItem';

const PostFeed = () => {
  const { posts } = useSelector(s => s.post);

  return posts.map(post => <PostItem key={post._id} post={post} />);
}

export default PostFeed;
