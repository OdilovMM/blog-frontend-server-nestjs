import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import DesktopMenu from './menus/DesktopMenu';
import { selectCurrentUser } from '../../auth/slice/authSlice';
import { useAppSelector } from '../../../app/hooks';
import DrawerMenu from './menus/DrawerMenu';

const Header = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const [dark, setDark] = useState(true);
  const handleChangeTheme = () => {};

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="blog" width={50} />
        </NavLink>
      </div>

      <div className="menu">
        <DesktopMenu user={user} />
        <span className="sp-border">
          <input
            type="checkbox"
            id="dark"
            name="dark"
            checked={dark}
            onChange={handleChangeTheme}
          />
          <label htmlFor="dark">Dark</label>
        </span>
        <DrawerMenu user={user} />
      </div>
    </header>
  );
};

export default Header;
