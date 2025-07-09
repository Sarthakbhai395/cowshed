import React from 'react';

const CowCard = ({ cow }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 w-72 hover:scale-105 transition-transform duration-300">
    <img
      src={cow.image}
      alt={cow.name}
      className="h-48 w-full object-cover rounded-md mb-4"
    />
    <h2 className="text-xl font-semibold">{cow.name}</h2>
    <p>Breed: {cow.breed}</p>
    <p>Age: {cow.age} years</p>
  </div>
);

export default CowCard;
