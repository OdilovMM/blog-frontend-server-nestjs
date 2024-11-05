import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import DesktopMenu from './menus/DesktopMenu';
import DrawerMenu from './menus/DrawerMenu';
import { selectTheme, changeTheme } from '../slice/themeSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SearchDialogue from './SearchDialogue';

const Header = () => {
  const { user } = useAppSelector(selectTheme);
  const darkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  // const { dark: darkMode } = useAppDispatch();
  const [dark, setDark] = useState(darkMode.dark);

  const handleChangeTheme = () => {
    setDark(!dark);
    dispatch(changeTheme(!dark));
  };

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="blog" width={50} />
        </NavLink>
      </div>

      <div className="menu">
        <SearchDialogue />
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
