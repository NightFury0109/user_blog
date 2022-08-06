import React, { useState } from 'react';
import { Input, Button, Upload, Avatar } from 'antd';
import { AiOutlineUser, AiOutlineUnlock, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUser } from '../../../redux/actions/auth';

import './style.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatar: null
  });

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = new FormData();

    newUser.append("name", userData.name);
    newUser.append("email", userData.email);
    newUser.append("password", userData.password);
    newUser.append("password2", userData.password2);
    newUser.append("avatar", userData.avatar);

    const res = await dispatch(createUser(newUser));

    if (res === 0) navigate("/signin");
  }

  const props = {
    showUploadList: false,
    beforeUpload(file) {
      let reader = new FileReader();

      reader.onload = function () {
        document.getElementById('avatar').firstChild.src = reader.result;
      }

      reader.readAsDataURL(file);

      setUserData({ ...userData, avatar: file });
    }
  };

  return (
    <div className="d-flex justify-content-center w-full">
      <div className='auth-page text-start'>
        <p className='fs-3 fw-bold text-center'>Create a new user</p>

        <form onSubmit={handleSignup}>
          <div className="text-center">
            <Upload {...props}>
              <Avatar
                shape="square"
                id="avatar"
                className="avt-rds mb-4"
                src="./img/avatar.png"
              />
            </Upload>
          </div>

          <Input
            placeholder='Username'
            size='large'
            prefix={<AiOutlineUser />}
            value={userData.name}
            name="name"
            type="text"
            onChange={onChange}
          />
          <Input
            placeholder='Email'
            size='large'
            prefix={<AiOutlineMail />}
            value={userData.email}
            name="email"
            type="email"
            onChange={onChange}
            className="my-4"
          />
          <Input
            placeholder='Password'
            type="password"
            size='large'
            name="password"
            prefix={<AiOutlineLock />}
            value={userData.password}
            onChange={onChange}
            className="mb-4"
          />
          <Input
            placeholder='Confirm Password'
            type="password"
            size='large'
            name="password2"
            prefix={<AiOutlineUnlock />}
            value={userData.password2}
            onChange={onChange}
            className="mb-4"
          />

          <Button size='large' type='primary' onClick={handleSignup}>Sign Up</Button>
        </form>
      </div>
    </div>
  )
}

export default Register;
