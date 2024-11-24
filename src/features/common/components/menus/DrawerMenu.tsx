import React, { useState } from 'react';
import { UserDto } from '../../../auth/dtos/user.dto';
import Drawer from 'rc-drawer';
import motionProps from './motion/motion';
import { FiMenu } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useSignOutMutation } from '../../../auth/api/authApi';

const DrawerMenu = ({ user }: { user: UserDto | null }) => {
  const [open, setOpen] = useState(false);
  const onTouchEnd = () => {
    setOpen(false);
  };
  const onSwitch = () => {
    setOpen((c) => !c);
  };

  const [signOut] = useSignOutMutation();

  const handleSignOut = () => {
    signOut();
  };
  return (
    <>
      <Drawer
        open={open}
        // defaultOpen
        onClose={onTouchEnd}
        afterOpenChange={(c: boolean) => {}}
        className="drawer"
        placement="right"
        // width={400}
        width="75%"
        // Motion
        {...motionProps}
      >
        <div className="mobile-menu">
          {user ? (
            <>
              <div className="menu-user">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
              <Link to="#" onClick={handleSignOut}>
                <FaSignOutAlt size={35} />
              </Link>
            </>
          ) : (
            <NavLink
              to="/auth"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Login / Register
            </NavLink>
          )}
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
          <NavLink
            to="#"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            About
          </NavLink>
          {user?.roles.find((role) => ['admin', 'author'].includes(role)) && (
            <>
              <NavLink
                to="/create-post"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Create Post
              </NavLink>
              <NavLink
                to="/create-category"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Create Category
              </NavLink>
              <NavLink
                to="/create-tag"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Create Tag
              </NavLink>
              <NavLink
                to="/approve"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Approve Posts
              </NavLink>
              <NavLink
                to="/users/role"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Role Update
              </NavLink>
            </>
          )}
        </div>
      </Drawer>
      <button onClick={onSwitch} className="menu-icon">
        <FiMenu />
      </button>
    </>
  );
};

export default DrawerMenu;
