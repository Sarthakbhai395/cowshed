const CowTable = ({ cows, onRemove }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Breed</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cows.map(cow => (
            <tr key={cow.id} className="border-t">
              <td className="py-3 px-4">{cow.id}</td>
              <td className="py-3 px-4">{cow.name}</td>
              <td className="py-3 px-4">{cow.breed}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  cow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {cow.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <button 
                  onClick={() => onRemove(cow.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CowTable;