import React, { useState } from 'react';
import Drawer from 'rc-drawer';
import { FiMenu } from 'react-icons/fi';
import { UserDto } from '../../../auth/dtos/user.dto';
import { Link, NavLink } from 'react-router-dom';
import { useSignOutMutation } from '../../../auth/api/authApi';

const DrawerMenu: React.FC<{ user: UserDto | null }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [signOut] = useSignOutMutation();

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <button
        className="block md:hidden p-2 text-gray-800 dark:text-gray-300"
        onClick={toggleDrawer}
      >
        <FiMenu size={24} />
      </button>

      <Drawer
        open={open}
        onClose={toggleDrawer}
        placement="right"
        width="75%"
        className="dark:bg-gray-900 bg-white"
      >
        <div className="p-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-lg">{user.name}</span>
            </div>
          ) : (
            <NavLink
              to="/auth"
              className="block text-lg py-2"
              onClick={toggleDrawer}
            >
              Sign In / Register
            </NavLink>
          )}
          <nav className="mt-4 space-y-2">
            <NavLink
              to="/"
              className="block hover:text-blue-500"
              onClick={toggleDrawer}
            >
              Home
            </NavLink>
            <NavLink
              to="/"
              className="block hover:text-blue-500"
              onClick={toggleDrawer}
            >
              About
            </NavLink>
            {user?.roles.some((role) => ['admin', 'author'].includes(role)) && (
              <>
                <NavLink
                  to="/create-post"
                  className="block hover:text-blue-500"
                  onClick={toggleDrawer}
                >
                  Create Post
                </NavLink>
                <NavLink
                  to="/approve"
                  className="block hover:text-blue-500"
                  onClick={toggleDrawer}
                >
                  Approve Posts
                </NavLink>
              </>
            )}
            {user && (
              <button
                onClick={() => {
                  signOut();
                  toggleDrawer();
                }}
                className="block text-left w-full hover:text-red-500"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
