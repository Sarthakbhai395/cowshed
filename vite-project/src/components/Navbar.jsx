import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiSun, FiMoon, FiMonitor, FiMenu, FiUser, FiSettings, FiTrendingUp, FiBarChart, FiBell, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ 
  cows = [], 
  pages = [], 
  features = [], 
  users = [],
}) => {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [popularSearches, setPopularSearches] = useState(['Dashboard', 'Cow Management', 'About', 'Contact']);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const [allAppData, setAllAppData] = useState([]);
  
  const getAllSearchableItems = () => {
    const items = [];
    
    const staticPages = [
      { id: 'home', name: 'Home', type: 'page', path: '/', description: 'Main dashboard with overview', icon: '🏠' },
      { id: 'about', name: 'About', type: 'page', path: '/about', description: 'About CowShade platform', icon: 'ℹ️' },
      { id: 'contact', name: 'Contact', type: 'page', path: '/contact', description: 'Get in touch with us', icon: '📞' },
      { id: 'admin', name: 'Admin Dashboard', type: 'page', path: '/admin', description: 'Administrative controls and settings', icon: '⚙️' },
    ];
    
    items.push(...staticPages);

    if (cows && cows.length > 0) {
      const cowItems = cows.map(cow => ({
        id: `cow-${cow.id}`,
        name: cow.name || `Cow #${cow.id}`,
        type: 'cow',
        path: `/cow/${cow.id}`,
        description: `${cow.breed || 'Cow'} - ${cow.status || 'Active'}`,
        icon: '🐄'
      }));
      items.push(...cowItems);
    }

    if (pages && pages.length > 0) {
      const pageItems = pages.map(page => ({
        id: `page-${page.id}`,
        name: page.title || page.name,
        type: 'page',
        path: page.path || page.url,
        description: page.description || '',
        icon: '📄'
      }));
      items.push(...pageItems);
    }

    if (features && features.length > 0) {
      const featureItems = features.map(feature => ({
        id: `feature-${feature.id}`,
        name: feature.name,
        type: 'feature',
        path: feature.path,
        description: feature.description || '',
        icon: '⚡'
      }));
      items.push(...featureItems);
    }

    if (users && users.length > 0) {
      const userItems = users.map(user => ({
        id: `user-${user.id}`,
        name: user.name || user.username,
        type: 'user',
        path: `/user/${user.id}`,
        description: `${user.role || 'User'} - ${user.email || ''}`,
        icon: '👤'
      }));
      items.push(...userItems);
    }
    
    return items;
  };

  useEffect(() => {
    setAllAppData(getAllSearchableItems());
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const body = document.body;
    
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    let appliedTheme = theme;
    
    if (theme === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    if (appliedTheme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.add('light');
      body.classList.add('light');
    }
    
    root.setAttribute('data-theme', appliedTheme);
    body.setAttribute('data-theme', appliedTheme);
    
    localStorage.setItem('theme', theme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        root.classList.add(newSystemTheme);
        body.classList.add(newSystemTheme);
        root.setAttribute('data-theme', newSystemTheme);
        body.setAttribute('data-theme', newSystemTheme);
      }
    };
    
    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    
    const filtered = allAppData.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm);
      const typeMatch = item.type.toLowerCase().includes(searchTerm);
      const descriptionMatch = item.description && item.description.toLowerCase().includes(searchTerm);
      
      const searchWords = searchTerm.split(' ');
      const nameWords = item.name.toLowerCase().split(' ');
      const wordMatch = searchWords.some(searchWord => 
        nameWords.some(nameWord => nameWord.includes(searchWord) || searchWord.includes(nameWord))
      );
      
      return nameMatch || typeMatch || descriptionMatch || wordMatch;
    });

    const scoredResults = filtered.map(item => {
      let score = 0;
      const searchTerm = query.toLowerCase();
      
      if (item.name.toLowerCase() === searchTerm) score += 100;
      if (item.name.toLowerCase().startsWith(searchTerm)) score += 50;
      if (item.name.toLowerCase().includes(searchTerm)) score += 25;
      if (item.type.toLowerCase().includes(searchTerm)) score += 15;
      if (item.description && item.description.toLowerCase().includes(searchTerm)) score += 10;
      if (searchHistory.includes(item.name)) score += 5;
      
      return { ...item, score };
    });

    const sortedResults = scoredResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    setSearchResults(sortedResults);
    setShowSearchResults(true);
  };

  const handleSearchSelect = (result) => {
    navigate(result.path);
    setSearchQuery('');
    setShowSearchResults(false);
    
    const newHistory = [result.name, ...searchHistory.filter(item => item !== result.name)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handlePopularSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    handleSearch(searchTerm);
  };

  const handleAdminClick = () => {
    navigate('/admin'); // Directly navigate to admin dashboard
  };

  const handleNavigation = (label) => {
    switch(label) {
      case 'Home':
        navigate('/');
        break;
      case 'About':
        navigate('/about');
        break;
      case 'Contact':
        navigate('/contact');
        break;
      default:
        navigate('/');
    }
  };

  const renderEmptySearchState = () => (
    <div className="px-4 py-3">
      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
        Popular searches
      </div>
      <div className="space-y-1">
        {popularSearches.map((search) => (
          <motion.div
            key={search}
            onClick={() => handlePopularSearch(search)}
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 cursor-pointer rounded transition-colors"
          >
            <FiTrendingUp size={14} />
            {search}
          </motion.div>
        ))}
      </div>
      {searchHistory.length > 0 && (
        <>
          <div className="text-sm font-medium text-gray-900 dark:text-white mt-3 mb-2">
            Recent searches
          </div>
          <div className="space-y-1">
            {searchHistory.slice(0, 3).map((search) => (
              <motion.div
                key={search}
                onClick={() => handlePopularSearch(search)}
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 cursor-pointer rounded transition-colors"
              >
                <FiSearch size={14} />
                {search}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <nav className="bg-green-700 dark:bg-gray-900 text-white p-4 flex flex-wrap md:flex-nowrap justify-between items-center shadow-md gap-4 relative">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <motion.h1 
          className="text-xl font-bold whitespace-nowrap cursor-pointer select-none"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🐄 CowShade
        </motion.h1>
        
        <div className="relative w-full md:w-[500px]">
          <motion.div 
            className={`flex items-center bg-white dark:bg-gray-700 text-black dark:text-white rounded-md px-4 py-2 w-full shadow-inner transition-all duration-300 ${
              isSearchFocused ? 'ring-2 ring-green-500 shadow-lg' : ''
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <FiSearch className="mr-2 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="🔍 Search anything in CowShade..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => {
                setIsSearchFocused(true);
                setShowSearchResults(true);
              }}
              onBlur={() => {
                setIsSearchFocused(false);
                setTimeout(() => setShowSearchResults(false), 200);
              }}
              className="bg-transparent outline-none w-full text-base placeholder-gray-500 dark:placeholder-gray-400 py-1"
            />
            {searchQuery && (
              <motion.button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </motion.button>
            )}
          </motion.div>
          
          <AnimatePresence>
            {showSearchResults && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md mt-1 shadow-xl z-50 max-h-80 overflow-y-auto"
              >
                {searchQuery.trim() === '' ? (
                  renderEmptySearchState()
                ) : searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        onClick={() => handleSearchSelect(result)}
                        whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg group-hover:scale-110 transition-transform">
                              {result.icon}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                {result.name}
                              </div>
                              {result.description && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {result.description}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {result.score > 50 && (
                              <FiStar className="text-yellow-400" size={12} />
                            )}
                            <div className="text-xs text-gray-400 dark:text-gray-500 capitalize bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                              {result.type}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      No results found for "{searchQuery}"
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Try searching for pages, cows, or features
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Home', icon: '🏠' },
            { label: 'About', icon: 'ℹ️' },
            { label: 'Contact', icon: '📞' }
          ].map(({ label, icon }) => (
            <motion.button
              key={label}
              onClick={() => handleNavigation(label)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-700 text-green-700 dark:text-white px-4 py-2 rounded-full font-medium hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group"
            >
              <span className="group-hover:scale-110 transition-transform">{icon}</span>
              {label}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-gray-700 rounded-full p-1 shadow-md">
          {[
            { mode: 'light', icon: FiSun, label: 'Light' },
            { mode: 'dark', icon: FiMoon, label: 'Dark' },
            { mode: 'system', icon: FiMonitor, label: 'System' }
          ].map(({ mode, icon: Icon, label }) => (
            <motion.button
              key={mode}
              onClick={() => setTheme(mode)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={label}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === mode 
                  ? 'bg-green-700 text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Icon size={16} />
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={handleAdminClick}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <motion.div
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.5, rotate: 45 }}
          />
          <div className="relative flex items-center gap-2">
            <FiSettings className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Admin</span>
          </div>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;