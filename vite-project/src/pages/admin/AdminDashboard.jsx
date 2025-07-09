import { Link } from 'react-router-dom';
import StatsCard from './components/StatsCard';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Total Cows" value="125" />
        <StatsCard title="New Registrations" value="12" />
        <StatsCard title="Pending Tasks" value="5" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              to="/admin/manage-cows" 
              className="block p-3 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
            >
              Manage Cows
            </Link>
            <Link 
              to="/admin/users" 
              className="block p-3 bg-green-50 text-green-700 rounded hover:bg-green-100"
            >
              Approve Users
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {/* Add recent activity items here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;