import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import { Affix } from 'antd';

import './style.css'

const Header = () => {
  return (
    <React.Fragment>
      <Navbar expand="sm" sticky='top' variant="light" className='header-bar p-2'>
        <div className="d-flex justify-content-between w-full align-items-center">
          <NavbarBrand as={NavLink} to="/">
            <span>UserBlog</span>
          </NavbarBrand>

          <div className='text-end'>
            <Nav className='d-flex align-items-center'>
              <button type='button' className='btn btn-primary'>
                SignIn
              </button>
            </Nav >
          </div >

        </div>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;