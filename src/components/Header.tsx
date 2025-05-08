import React from 'react';
import { VolleyballIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <VolleyballIcon className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-xl font-bold">VolleyStats Pro</h1>
            <p className="text-xs text-blue-200">Record · Analyze · Win</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm transition duration-200">
            New Match
          </button>
          <button className="border border-blue-400 hover:bg-blue-800 text-white px-3 py-1 rounded-md text-sm transition duration-200">
            Sync Data
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;