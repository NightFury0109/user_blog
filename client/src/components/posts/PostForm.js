import React, { useState } from 'react';
import { Input, Button, Avatar, Upload } from 'antd';

const { TextArea } = Input;

const PostForm = () => {
  const [postData, setPostData] = useState({
    comment: "",
    image: null
  });

  const createPost = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
  };

  const onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  const props = {
    showUploadList: false,
    beforeUpload(file) {
      let reader = new FileReader();

      reader.onload = function () {
        document.getElementById('avatar').firstChild.src = reader.result;
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
          <form onSubmit={createPost}>
            <div className="d-flex align-items-start">
              <Upload {...props}>
                <Avatar
                  shape="square"
                  id="avatar"
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
            <Button type="primary" className='mt-3'>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
