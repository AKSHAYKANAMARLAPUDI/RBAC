import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null); // For viewing or editing
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between view/edit mode
  const [showDetails, setShowDetails] = useState(false); // Show or hide user details
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "Active" }); // New user input
  const [showAddForm, setShowAddForm] = useState(false); // Show Add User form

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Handle Edit
  const handleEdit = (e) => {
    e.preventDefault();
    setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
    setIsEditMode(false);
    setShowDetails(false);
  };

  // Handle Add User
  const handleAdd = (e) => {
    e.preventDefault();
    const newId = users.length ? Math.max(users.map(user => user.id)) + 1 : 1;
    const userToAdd = { id: newId, ...newUser };
    setUsers([...users, userToAdd]);
    setShowAddForm(false); // Close the Add User form
    setNewUser({ name: "", role: "", status: "Active" }); // Clear the form
  };

  return (
    <div>
      <h2>User Management</h2>

      {/* Add New User Button */}
      <button onClick={() => setShowAddForm(true)}>Add New User</button>

      {/* Add New User Form */}
      {showAddForm && (
        <form onSubmit={handleAdd}>
          <h3>Add New User</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <input
              type="text"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">Add User</button>
          <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
        </form>
      )}

      {/* User Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => { setSelectedUser(user); setShowDetails(true); }}>View</button>
                <button onClick={() => { setSelectedUser(user); setIsEditMode(true); setShowDetails(true); }}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Details Modal */}
      {showDetails && (
        <div className="modal">
          {isEditMode ? (
            <form onSubmit={handleEdit}>
              <h3>Edit User</h3>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Role:</label>
                <input
                  type="text"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Status:</label>
                <select
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setShowDetails(false)}>Cancel</button>
            </form>
          ) : (
            <div>
              <h3>View User</h3>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <button onClick={() => setShowDetails(false)}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
