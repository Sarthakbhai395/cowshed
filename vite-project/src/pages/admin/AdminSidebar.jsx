import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admin" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-cows" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Manage Cows
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;