import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DesktopMenu from './menus/DesktopMenu';
import DrawerMenu from './menus/DrawerMenu';
import { selectTheme, changeTheme } from '../slice/themeSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SearchDialogue from './SearchDialogue';
import { selectCurrentUser } from '../../auth/slice/authSlice';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const Header: React.FC = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const darkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  // const { dark: darkMode } = useAppDispatch();
  const [dark, setDark] = useState(darkMode.dark);

  const handleChangeTheme = () => {
    setDark(!dark);
    dispatch(changeTheme(!dark));
  };

  return (
    <header
      className={`flex justify-between items-center px-4 py-3 shadow-md ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <NavLink
          to="/"
          className={`text-xl font-bold ${dark ? 'text-gray' : 'text-white'}`}
        >
          Odilov's Blog
        </NavLink>
      </div>

      {/* Menu and Actions */}
      <div className="menu flex items-center  space-x-4">
        <SearchDialogue />
        <DesktopMenu user={user} />
        <button
          className={`p-2 rounded-full w-[35px] ${
            dark ? 'bg-gray-800' : 'bg-gray-100'
          } hover:bg-gray-200 dark:hover:bg-gray-700`}
          onClick={handleChangeTheme}
          aria-label="Toggle Theme"
        >
          {dark ? (
            <BsSunFill className="text-gray-300" />
          ) : (
            <BsMoonFill className="text-yellow-600" />
          )}
        </button>
        <DrawerMenu user={user} />
      </div>
    </header>
  );
};
export default Header;
