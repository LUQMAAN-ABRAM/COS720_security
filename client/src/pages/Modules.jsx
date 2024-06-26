import React, { useState } from "react";
import { useSelector } from 'react-redux';
import log from 'loglevel';

const Module = ({ subject, onRegister, isRegistered }) => {
  const currentUserEmail = useSelector(state => state.user);

  const handleRegister = () => {
    onRegister(subject, currentUserEmail);
  };

  return (
    <div className="bg-gray-800 p-4 m-2 rounded-lg">
      <h2 className="text-lg font-bold text-white">{subject}</h2>
      {!isRegistered && (
        <button
          onClick={handleRegister}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Register
        </button>
      )}
    </div>
  );
};

const Modules = () => {
  const subjects = [
    "Mathematics",
    "Science",
    "History",
    "Literature",
    "Art",
    "Computer Science",
    "Physics",
    "Biology",
    "Geography",
  ];

  const [registeredModules, setRegisteredModules] = useState([]);

  const registerSubject = async (subject, currentUserEmail) => {
    console.log(subject);
    var email = currentUserEmail.currentuser.email;
    try {
      log.info('User chose a subject');
      const res = await fetch('/backend/module/modulereg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, registeredModules: subject }),
      });
      const data = await res.json();
      console.log(data);
      console.log("Subject registered successfully");
      
      // Update the state to mark this subject as registered
      setRegisteredModules([...registeredModules, subject]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-white">Modules</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject, index) => (
          <Module
            key={index}
            subject={subject}
            onRegister={registerSubject}
            isRegistered={registeredModules.includes(subject)}
          />
        ))}
      </div>
    </div>
  );
};

export default Modules;
