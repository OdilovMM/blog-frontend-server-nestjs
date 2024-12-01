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
      enqueueSnackbar('Selected Roles Updated', { variant: 'success' });
      setRoles([]);
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col bg-gray-100 w-full p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Update User Roles
      </h2>
      <div className="data-table space-y-4">
        {users &&
          users
            .filter((user) => user._id !== adminUser?._id)
            .map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm"
              >
                <input
                  type="radio"
                  value={user._id}
                  checked={id === user._id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-5 h-5"
                />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">Name:</span>
                  <span className="text-gray-700">{user.name}</span>
                  <span className="font-medium text-gray-800">Role(s):</span>
                  <span className="text-gray-700">
                    {user.roles.map((role, index) => (
                      <span key={role}>
                        {role}
                        {user.roles.length - 1 !== index && ', '}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-800 mb-2">Set Roles:</h3>
        <div className="flex gap-4">
          {rolesType.map((role) => (
            <label key={role} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={role}
                name={role}
                checked={roles.includes(role)}
                value={role}
                onChange={handleRole}
                className="w-5 h-5"
              />
              <span className="text-gray-700">{role}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`mt-6 w-full py-2 text-white font-semibold rounded-md ${
          isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Updating...' : 'Update User Roles'}
      </button>
    </div>
  );
};

export default UpdateUserRoles;
