import React, { useState } from 'react';
import { Input, Button, Avatar, Upload } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { createPost, loadPosts } from '../../redux/actions/post';

const { TextArea } = Input;

const PostForm = () => {
  const [postData, setPostData] = useState({
    comment: "",
    image: null
  });
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const newPost = new FormData();

    newPost.append("image", postData.image);
    newPost.append("comment", postData.comment);
    newPost.append("name", user.name);
    newPost.append("avatar", user.avatar);

    const res = await dispatch(createPost(newPost));

    if (res === 0) {
      dispatch(loadPosts());
      setPostData({
        ...postData, comment: ""
      });

      document.getElementById('image').firstChild.src = "./img/upload.png";
    }
  };

  const onChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const props = {
    showUploadList: false,
    beforeUpload(file) {
      let reader = new FileReader();

      reader.onload = function () {
        document.getElementById('image').firstChild.src = reader.result;
      }

      reader.readAsDataURL(file);

      setPostData({ ...postData, image: file });
    }
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-success text-white">Say Somthing...</div>
        <div className="card-body">
          <form onSubmit={handleCreatePost}>
            <div className="d-flex align-items-start">
              <Upload {...props}>
                <Avatar
                  shape="square"
                  id="image"
                  className="avt-rds me-2"
                  src="./img/upload.png"
                />
              </Upload>

              <TextArea
                placeholder="Make a comment"
                name="comment"
                rows={4}
                value={postData.comment}
                onChange={onChange}
              />
            </div>
            <Button type="primary" className='mt-3' onClick={handleCreatePost}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
