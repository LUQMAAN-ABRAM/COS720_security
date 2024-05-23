import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSCWv9VdpGtT1Ah241Sqv8TnDB3qf9Q5WFjQ&s')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-4xl font-bold mb-6">Welcome to the COS720 Cloud Security Project</div>
      <p className="text-lg mb-8">Try our cutting-edge modules.</p>
      <Link
        to="/Modules"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Choose Your Modules
      </Link>
    </div>
  );
};

export default Home;
