import React from 'react';
import CowCard from './CowCard';

const cows = [
  {
    name: "Gauri",
    breed: "Sahiwal",
    age: 4,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
  },
  {
    name: "Laxmi",
    breed: "Gir",
    age: 5,
    image: "https://images.unsplash.com/photo-1572727197200-cf80f9e78504",
  },
  {
    name: "Kamdhenu",
    breed: "Tharparkar",
    age: 6,
    image: "https://images.unsplash.com/photo-1617957741983-00f67b49f7db",
  },
  {
    name: "Nandini",
    breed: "Red Sindhi",
    age: 3,
    image: "https://images.unsplash.com/photo-1549887534-23c31f6b1b6e",
  },
  {
    name: "Radha",
    breed: "Hariana",
    age: 2,
    image: "https://images.unsplash.com/photo-1621036529975-32e11bdba00a",
  },
];

const CowList = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Cow List</h1>
    <div className="flex flex-wrap gap-6 justify-center">
      {cows.map((cow, index) => (
        <CowCard key={index} cow={cow} />
      ))}
    </div>
  </div>
);

export default CowList;
