import React from 'react';
import { NavLink } from 'react-router-dom';
// import { FaAlignJustify } from 'react-icons/fa';
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { clearErrors } from '../../../redux/actions/auth';

import './style.css'

const Header = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onClickAuthBtn = async () => {
    await dispatch(clearErrors());
  }

  return (
    <React.Fragment>
      <Navbar expand="sm" sticky='top' variant="light" className='header-bar p-2'>
        <div className="d-flex justify-content-between w-full align-items-center">
          <NavbarBrand as={NavLink} to="/">
            <span className='text-white fw-bold'>UserBlog</span>
          </NavbarBrand>

          <div className='text-end'>
            <Nav className='d-flex align-items-center'>
              <Nav.Link as={NavLink} to="/posts">
                <div className="nav-item me-3">Posts</div>
              </Nav.Link>

              <NavLink to="/signin">
                <Button type='primary' shape="round" className='me-2' onClick={onClickAuthBtn}>
                  Login
                </Button>
              </NavLink>

              <NavLink to="/signup">
                <Button type='primary' shape="round" onClick={onClickAuthBtn}>
                  SignUp
                </Button>
              </NavLink>
            </Nav >
          </div >

        </div>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;