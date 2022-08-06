import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Upload, Avatar, Input, Button } from 'antd';

import { makeComment, loadPosts, getPost } from '../../redux/actions/post';

import isEmpty from '../../utils/is-empty';

const { TextArea } = Input;

const CommentForm = ({ postId }) => {
  const [postData, setPostData] = useState({
    comment: "",
    image: null
  });

  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector(s => s.auth);
  const { post } = useSelector(s => s.post);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (post.user === user._id) {
      // alert("You can't make a comment to your post");
      setErrMsg("You can't make a comment to your post");
    } else {
      const commetData = new FormData();

      commetData.append("image", postData.image);
      commetData.append("comment", postData.comment);
      commetData.append("name", user.name);
      commetData.append("avatar", user.avatar);

      const res = await dispatch(makeComment(postId, commetData));

      if (res === 0) {
        dispatch(loadPosts());
        dispatch(getPost(postId));
        setPostData({
          ...postData, comment: ""
        });

        document.getElementById('comment-img').firstChild.src = "./img/upload.png";
      }
    }
  }

  const onChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const props = {
    showUploadList: false,
    beforeUpload(file) {
      let reader = new FileReader();

      reader.onload = function () {
        document.getElementById('comment-img').firstChild.src = reader.result;
      }

      reader.readAsDataURL(file);

      setPostData({ ...postData, image: file });
    }
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-success text-white">
          Make a comment...
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit} className="text-center">
            <div className="d-flex align-items-start">
              <Upload {...props}>
                <Avatar
                  shape="square"
                  id="comment-img"
                  className="avt-rds me-2"
                  src="../img/upload.png"
                />
              </Upload>

              <div className='w-full text-start'>
                <TextArea
                  placeholder="Reply to post"
                  name="comment"
                  rows={4}
                  value={postData.comment}
                  onChange={onChange}
                />

                {!isEmpty(errMsg) && <div className='text-danger'>{errMsg}</div>}
              </div>
            </div>

            <Button type="primary" className='mt-3' onClick={onSubmit}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
