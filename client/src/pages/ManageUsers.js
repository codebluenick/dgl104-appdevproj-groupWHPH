// pages/ManageUsers.js
import React, { useState } from 'react';
import '../styles/ManageUsers.css'; 

const mockUsers = [
  { id: 1, name: 'Hardik Vaghasiya', email: 'hardik.vaghasiya.admission@gmail.com', role: 'Admin' },
  { id: 2, name: 'Team Lead User', email: 'vaghasiyahardik2001@gmail.com', role: 'TeamLead' },
  { id: 3, name: 'Member One', email: 'gratisbear14@gmail.com', role: 'TeamMember' },
];

const roles = ['Admin', 'TeamLead', 'TeamMember'];

function ManageUsers() {
  const [users, setUsers] = useState(mockUsers);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleSaveChanges = () => {
    console.log('🔁 Saving changes to backend (coming soon)...');
    console.table(users);
    alert('Changes saved (mock)');
  };

  return (
    <div className="manage-users-page">
      <h2>Manage Users</h2>
      <p>Edit roles of users in the system.</p>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="save-btn" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
}

export default ManageUsers;
