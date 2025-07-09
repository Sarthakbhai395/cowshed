const AdminNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;