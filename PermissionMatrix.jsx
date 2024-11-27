import React, { useState } from 'react';

const PermissionMatrix = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', roles: ['Admin', 'Editor'] },
    { id: 2, name: 'Bob', roles: ['Viewer'] },
    { id: 3, name: 'Charlie', roles: ['Editor'] },
  ]);

  const [roles] = useState(['Admin', 'Editor', 'Viewer']);
  const [permissions] = useState(['Read', 'Write', 'Delete']);
  
  const [permissionsMatrix, setPermissionsMatrix] = useState(generateInitialMatrix());

  // Generate initial permissions matrix (users x permissions)
  function generateInitialMatrix() {
    return users.map(user => ({
      ...user,
      permissions: permissions.reduce((acc, permission) => {
        acc[permission] = user.roles.includes('Admin') || user.roles.includes('Editor') ? true : false;
        return acc;
      }, {})
    }));
  }

  // Handle permission change
  const handlePermissionChange = (userId, permission) => {
    setPermissionsMatrix(prevState =>
      prevState.map(user =>
        user.id === userId
          ? {
              ...user,
              permissions: {
                ...user.permissions,
                [permission]: !user.permissions[permission],
              },
            }
          : user
      )
    );
  };

  // Handle role change for user
  const handleRoleChange = (userId, role) => {
    setUsers(prevState =>
      prevState.map(user =>
        user.id === userId
          ? {
              ...user,
              roles: user.roles.includes(role)
                ? user.roles.filter(r => r !== role)
                : [...user.roles, role],
            }
          : user
      )
    );
    setPermissionsMatrix(generateInitialMatrix()); // Recalculate matrix when role is updated
  };

  return (
    <div>
      <h2>Permission Matrix</h2>

      {/* Roles and Permissions table */}
      <table>
        <thead>
          <tr>
            <th>User</th>
            {permissions.map((permission) => (
              <th key={permission}>{permission}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissionsMatrix.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              {permissions.map((permission) => (
                <td key={permission}>
                  <input
                    type="checkbox"
                    checked={user.permissions[permission]}
                    onChange={() => handlePermissionChange(user.id, permission)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Role Management for Users */}
      <div>
        <h3>Assign Roles</h3>
        {users.map((user) => (
          <div key={user.id}>
            <h4>{user.name}</h4>
            {roles.map((role) => (
              <label key={role}>
                <input
                  type="checkbox"
                  checked={user.roles.includes(role)}
                  onChange={() => handleRoleChange(user.id, role)}
                />
                {role}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionMatrix;
