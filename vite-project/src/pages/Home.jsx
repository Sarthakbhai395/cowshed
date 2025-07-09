import React from 'react';
import { motion } from 'framer-motion';
import CowCard from '../components/CowCard';

const cows = [
  {
    name: "Gauri",
    breed: "Sahiwal",
    age: 4,
    image: "https://via.placeholder.com/300x200"
  },
  {
    name: "Laxmi",
    breed: "Gir",
    age: 5,
    image: "https://via.placeholder.com/300x200"
  }
];

const Home = () => {
  return (
    <div className="p-6">
      {/* 🐄 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-200 to-green-100 py-12 px-4 text-center rounded-lg shadow-lg mb-8"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Welcome to CowShade 🐄
        </h1>
        <p className="text-lg text-green-700 max-w-2xl mx-auto">
          Manage your cow shed effortlessly with our modern and beautiful interface. Add, track, and view cow information in one place.
        </p>
      </motion.div>

      {/* 🐮 Cow List */}
      <h2 className="text-2xl font-bold mb-4">Cow List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cows.map((cow, index) => (
          <CowCard cow={cow} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
