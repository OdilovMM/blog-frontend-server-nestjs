import React, { useEffect, useState } from 'react';
import { useChangeRolesMutation, useGetUsersQuery } from '../api/authApi';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../slice/authSlice';

const UpdateUserRoles = () => {
  const { user: adminUser } = useAppSelector(selectCurrentUser);

  const rolesType: string[] = ['admin', 'author', 'reader'];

  const { data: users } = useGetUsersQuery();
  const [changeRoles, { isSuccess, isLoading }] = useChangeRolesMutation();
  const [id, setId] = useState<string>();
  const [roles, setRoles] = useState<string[]>([]);

  const handleRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updateList = [...roles];
    if (event.target.checked) {
      updateList = [...roles, event.target.value];
    } else {
      updateList.splice(roles.indexOf(event.target.value), 1);
    }
    setRoles(updateList);
  };

  const handleSubmit = () => {
    if (id !== undefined && id && roles.length) {
      const rolesUpdate = { id, roles };
      changeRoles(rolesUpdate);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Selected Roles Update', { variant: 'success' });
      setRoles([]);
    }
  }, [isSuccess]);
  return (
    <>
      <div className="data-table">
        {users &&
          users
            .filter((user) => user._id !== adminUser?._id)
            .map((user) => (
              <div
                key={user._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '10px',
                }}
              >
                <input
                  type="radio"
                  value={user._id}
                  checked={id === user._id}
                  onChange={(e) => setId(e.target.value)}
                />
                <img src={user.avatar} alt={user.name} className="avatar-big" />
                <div>
                  <div>
                    <span>Name:</span>
                    <span>{user.name}</span>
                  </div>
                  <div>
                    <span>Role(s) :</span>
                    <span>
                      {user.roles.map((role, index) => (
                        <div key={role}>
                          {role}{' '}
                          {user.roles.length && user.roles.length - 1 === index
                            ? ''
                            : ','}
                        </div>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div>
        Set Roles:
        {rolesType.map((role) => (
          <span key={role} className="sp-bor">
            <input
              type="checkbox"
              id={role}
              name={role}
              checked={roles.includes(role)}
              value={role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleRole(e)
              }
            />
            <label htmlFor={role}>{role}</label>
          </span>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={isLoading ? true : false}>
        Update User Roles
      </button>
    </>
  );
};

export default UpdateUserRoles;
