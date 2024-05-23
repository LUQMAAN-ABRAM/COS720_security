import React from 'react';

const About = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtPMl2_eUx2WMeEy0FVEXZjWbjNZZrmgdLrA&s')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-lg p-8 rounded-lg bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4">Security Monitoring</h1>
        <p className="text-white mb-6">
          
        </p>
        <button
          onClick={() => window.open('https://sonarcloud.io/summary/new_code?id=LUQMAAN-ABRAM_COS720_security')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Monitor
        </button>
      </div>
    </div>
  );
};

export default About;
