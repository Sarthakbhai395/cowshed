import { Link } from 'react-router-dom';
import CowTable from './components/CowTable';

const ManageCows = () => {
  // Sample cow data - replace with your actual data
  const [cows, setCows] = useState([
    { id: 1, name: 'Bella', breed: 'Holstein', status: 'Active' },
    { id: 2, name: 'Daisy', breed: 'Jersey', status: 'Active' },
    // Add more cows as needed
  ]);

  const handleRemoveCow = (id) => {
    setCows(cows.filter(cow => cow.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Cows</h2>
        <Link 
          to="/add-cow" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Cow
        </Link>
      </div>
      <CowTable cows={cows} onRemove={handleRemoveCow} />
    </div>
  );
};

export default ManageCows;