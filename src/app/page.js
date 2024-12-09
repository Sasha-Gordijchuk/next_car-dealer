'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    async function fetchMakes() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`
      );
      const data = await response.json();

      setMakes(data.Results || []);

      console.log(data.Results.map((make) => make.MakeId.toString()));
      
    }
    fetchMakes();
  }, []);

  useEffect(() => {
    setIsNextEnabled(selectedMake && selectedYear);
  }, [selectedMake, selectedYear]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Select Vehicle Filters</h1>
      <div className="space-y-6 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-gray-700 mb-2">Vehicle Make</label>
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="block text-gray-700 mb-2">Model Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
  
        <Link
          href={isNextEnabled ? `/result/${selectedMake}/${selectedYear}` : '#'}
          className={`block text-center py-3 rounded-lg bg-blue-500 text-white font-semibold transition-all duration-200 ${
            isNextEnabled
              ? 'hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Next
        </Link>
      </div>
    </main>
  );  
}
