import React from 'react';
import { UserDto } from '../../../auth/dtos/user.dto';
import { NavLink } from 'react-router-dom';
import { useSignOutMutation } from '../../../auth/api/authApi';

const DesktopMenu = ({ user }: { user: UserDto | null }) => {
  const [signOut] = useSignOutMutation();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="desk-menu">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        About
      </NavLink>
      {!user && (
        <NavLink
          to="/auth"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Sign Up / In
        </NavLink>
      )}
      {user && (
        <div className="dropdown">
          <div className="dropdown-trigger">
            <img src={user.avatar} alt={user.name} className="avatar-small" />
            <span>{user.name}</span>
          </div>
          <div className="dropdown-content">
            <button onClick={handleSignOut} className="dropdown-link">
              Logout
            </button>
            {user.roles.some((role) => ['admin', 'author'].includes(role)) && (
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
        </div>
      )}
    </div>
  );
};

export default DesktopMenu;
