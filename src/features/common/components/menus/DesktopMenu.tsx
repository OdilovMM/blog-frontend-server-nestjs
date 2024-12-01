import React, { useState } from 'react';
import { UserDto } from '../../../auth/dtos/user.dto';
import { NavLink } from 'react-router-dom';
import { useSignOutMutation } from '../../../auth/api/authApi';

const DesktopMenu: React.FC<{ user: UserDto | null }> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signOut] = useSignOutMutation();

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <nav className="hidden md:flex items-center space-x-4">
      <NavLink to="/" className="hover:text-blue-500">
        Home
      </NavLink>
      <NavLink to="/" className="hover:text-blue-500">
        About
      </NavLink>

      {!user ? (
        <NavLink to="/auth" className="hover:text-blue-500">
          Sign In / Up
        </NavLink>
      ) : (
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleDropdownToggle}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border "
            />
            <span className="text-white">{user.name}</span>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
              <NavLink
                to="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={closeDropdown}
              >
                My Profile
              </NavLink>
              {user.roles.some((role) =>
                ['admin', 'author'].includes(role)
              ) && (
                <>
                  <NavLink
                    to="/create-post"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeDropdown}
                  >
                    Create Post
                  </NavLink>
                  <NavLink
                    to="/create-category"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeDropdown}
                  >
                    Create Category
                  </NavLink>
                  <NavLink
                    to="/approve"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeDropdown}
                  >
                    Approve Posts
                  </NavLink>
                  <NavLink
                    to="/create-tag"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeDropdown}
                  >
                    Create Tag
                  </NavLink>
                  <NavLink
                    to="/users/role"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeDropdown}
                  >
                    Role Update
                  </NavLink>
                </>
              )}
              <button
                onClick={() => {
                  signOut();
                  closeDropdown();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default DesktopMenu;
