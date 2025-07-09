const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="notifications">Enable Notifications</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="darkMode">Dark Mode</label>
        </div>
        
        <div>
          <label htmlFor="language" className="block mb-2">Language:</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;