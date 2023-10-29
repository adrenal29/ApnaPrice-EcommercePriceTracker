import React from 'react';

const LoginPopup = ({ isOpen:any, onClose:any }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-opacity-80 bg-gray-800 absolute inset-0 z-0"></div>
      <div className="bg-white p-2 z-10 rounded-lg shadow-lg "> {/* Updated container width */}
        <h2 className="text-3xl font-semibold mb-4 text-center text-blue-600">
          Login
        </h2>
        <form className="space-y-12">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <button
          className="mt-4 text-center text-blue-600 hover:underline cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
