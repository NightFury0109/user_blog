import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userLogin } from '../../../redux/actions/auth';

import './style.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: ''
  });

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await dispatch(userLogin(userData));

    if (res === 0) navigate("/images");
  }

  return (
    <div className="d-flex justify-content-center w-full">
      <div className='auth-page text-start'>
        <p className='fs-3 fw-bold text-center'>User Login</p>

        <form onSubmit={handleLogin}>
          <Input
            placeholder='Email'
            size='large'
            prefix={<AiOutlineMail />}
            value={userData.email}
            name="email"
            type="email"
            onChange={onChange}
          />
          <Input
            placeholder='Password'
            type="password"
            size='large'
            name="password"
            prefix={<AiOutlineUnlock />}
            value={userData.password}
            onChange={onChange}
            className="my-4"
          />

          <Button size='large' type='primary' onClick={handleLogin}>Login</Button>
        </form>
      </div>
    </div>
  )
}

export default Login;
