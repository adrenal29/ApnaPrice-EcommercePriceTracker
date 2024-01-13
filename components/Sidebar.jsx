import React from 'react'
import { HomeIcon, ShoppingCartIcon, PlusCircleIcon } from '@heroicons/react/solid';

const Sidebar = ({ setActiveOption }) => {
  return (
    <div className="sidebar bg-gray-800 p-7 h-screen  w-70" style={{color:"white"}}>
      <h2 className="text-white text-2xl font-bold mb-4 my-4">Vendor Options</h2>
      <ul>
        <li className="mb-4 cursor-pointer my-12" onClick={() => setActiveOption('create-store')}>
          <PlusCircleIcon className="h-6 w-6 text-white inline mr-2" />
          Create New Store
        </li>
        <li className="mb-4 cursor-pointer my-8" onClick={() => setActiveOption('view-purchases')}>
          <ShoppingCartIcon className="h-6 w-6 text-white inline mr-2" />
          View Product Purchases
        </li>
        <li className="mb-4 cursor-pointer my-8" onClick={() => setActiveOption('add-items')}>
          <HomeIcon className="h-6 w-6 text-white inline mr-2" />
          Add Items to Store
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

  