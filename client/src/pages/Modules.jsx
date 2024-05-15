// Modules.js

import React from "react";
import { useSelector } from 'react-redux';
import { useState } from "react";


const Module = ({ subject, onRegister }) => {
  const currentUserEmail = useSelector(state => state.user);

  const handleRegister = () => {
    onRegister(subject, currentUserEmail);
    
  };

  return (
    <div className="bg-gray-200 p-4 m-2 rounded-lg">
      <h2 className="text-lg font-bold">{subject}</h2>
      <button onClick={handleRegister} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register
      </button>
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

  const registerSubject =  async(subject, currentUserEmail) => {
    console.log(subject);
    var email = currentUserEmail.currentuser.email ;
    var registeredModules = subject ;
    try {
      const res =  await fetch('/backend/module/modulereg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , registeredModules }),
      });
      const data = await res.json();
      console.log(data);
      console.log("Subject registered successfully");
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Modules</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject, index) => (
          <Module key={index} subject={subject} onRegister={registerSubject} />
        ))}
      </div>
    </div>
  );
};

export default Modules;
