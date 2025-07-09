import { useState } from 'react';
import UserTable from './components/UserTable';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'approved' } : user
    ));
    toast.success('User approved successfully!');
  };

  const handleReject = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast.error('User rejected and removed!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <UserTable 
        users={users} 
        onApprove={handleApprove} 
        onReject={handleReject} 
      />
    </div>
  );
};

export default Users;