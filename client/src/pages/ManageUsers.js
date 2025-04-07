// pages/ManageUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ManageUsers.css'; 

// const mockUsers = [
//   { id: 1, name: 'Hardik Vaghasiya', email: 'hardik.vaghasiya.admission@gmail.com', role: 'Admin' },
//   { id: 2, name: 'Team Lead User', email: 'vaghasiyahardik2001@gmail.com', role: 'TeamLead' },
//   { id: 3, name: 'Member One', email: 'gratisbear14@gmail.com', role: 'TeamMember' },
// ];


function ManageUsers() {
  // const [users, setUsers] = useState(mockUsers);
  // userRoles
  const roles = ['admin', 'teamlead', 'teammember'];
  // state for the user list
  const [users, setUsers] = useState([]);
  
  // fetch data from backend
  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);
  // handle role changes in the role dropdown
  const handleRoleChange = (userId, newRole) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };
  

  // const handleSaveChanges = () => {
  //   console.log('🔁 Saving changes to backend (coming soon)...');
  //   console.table(users);
  //   alert('Changes saved (mock)');
  // };
  // save changes to backend
  const handleSaveChanges = () => {
    axios.put('http://localhost:3001/api/users/bulk-update', { users })
      .then(() => {
        alert('Changes saved successfully!');
      })
      .catch((err) => {
        console.error('Failed to save changes:', err);
        alert('Failed to save changes.');
      });
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
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
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
