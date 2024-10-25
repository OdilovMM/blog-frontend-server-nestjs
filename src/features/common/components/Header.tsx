import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="blog" width={50} />
        </NavLink>
      </div>

      <div className="menu"></div>
    </header>
  );
};

export default Header;
