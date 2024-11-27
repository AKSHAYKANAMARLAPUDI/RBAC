import React, { useState } from 'react';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    { id: 3, name: 'Viewer', permissions: ['Read'] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [roleDetails, setRoleDetails] = useState(null);
  const [newRoleData, setNewRoleData] = useState({ name: '', permissions: [] });

  // Handle form change for editing or adding role
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setNewRoleData((prevState) => {
        const newPermissions = checked
          ? [...prevState.permissions, value]
          : prevState.permissions.filter((permission) => permission !== value);
        return { ...prevState, permissions: newPermissions };
      });
    } else {
      setNewRoleData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Edit role functionality
  const handleEdit = (role) => {
    setRoleToEdit(role);
    setNewRoleData({ name: role.name, permissions: role.permissions });
  };

  // Save the edited role and update the state
  const handleSaveEdit = () => {
    setRoles((prevState) =>
      prevState.map((role) =>
        role.id === roleToEdit.id ? { ...role, ...newRoleData } : role
      )
    );
    setRoleToEdit(null);
    setNewRoleData({ name: '', permissions: [] });
  };

  // Handle adding a new role
  const handleAddRole = () => {
    const newRole = { id: Date.now(), ...newRoleData }; // Generate a unique id (using Date.now for simplicity)
    setRoles((prevState) => [...prevState, newRole]);
    setNewRoleData({ name: '', permissions: [] }); // Reset form
  };

  // Handle role deletion
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this role?');
    if (confirmDelete) {
      setRoles((prevState) => prevState.filter((role) => role.id !== id));
    }
  };

  // Handle viewing role details
  const handleView = (role) => {
    setRoleDetails(role);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setRoleDetails(null);
  };

  return (
    <div>
      <h2>Role Management</h2>
      <button onClick={() => setRoleToEdit({ id: '', name: '', permissions: [] })}>
        Add New Role
      </button>

      {/* Display roles list */}
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name} - Permissions: {role.permissions.join(', ')}
            <button onClick={() => handleView(role)}>View</button>
            <button onClick={() => handleEdit(role)}>Edit</button>
            <button onClick={() => handleDelete(role.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Edit/Add Role Form */}
      {(roleToEdit || newRoleData.name) && (
        <div>
          <h3>{roleToEdit ? 'Edit Role' : 'Add Role'}</h3>
          <input
            type="text"
            name="name"
            value={newRoleData.name}
            onChange={handleInputChange}
            placeholder="Role Name"
          />
          <div>
            <label>
              <input
                type="checkbox"
                value="Read"
                checked={newRoleData.permissions.includes('Read')}
                onChange={handleInputChange}
              />
              Read
            </label>
            <label>
              <input
                type="checkbox"
                value="Write"
                checked={newRoleData.permissions.includes('Write')}
                onChange={handleInputChange}
              />
              Write
            </label>
            <label>
              <input
                type="checkbox"
                value="Delete"
                checked={newRoleData.permissions.includes('Delete')}
                onChange={handleInputChange}
              />
              Delete
            </label>
          </div>
          <button onClick={roleToEdit ? handleSaveEdit : handleAddRole}>
            {roleToEdit ? 'Save Changes' : 'Add Role'}
          </button>
        </div>
      )}

      {/* View Role Details Modal */}
      {showModal && roleDetails && (
        <div>
          <h3>Role Details</h3>
          <p>Name: {roleDetails.name}</p>
          <p>Permissions: {roleDetails.permissions.join(', ')}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
