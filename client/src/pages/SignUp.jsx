import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signinstart, signinsuccess, signinfailure, signOut } from '../redux/user/UserSlice.js';
import { useDispatch } from 'react-redux';
import log from 'loglevel';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState(false);
  
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      log.info('User signup attempt'); // Log login attempt
      seterror(false);
      dispatch(signinstart());
      const res = await fetch('/backend/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signinsuccess(data));
      navigate('/Home');
      if (data.success === false) {
        seterror(true);
        return;
      }
    } catch (error) {
      seterror(true);
    }
  };

  const handlesignout = async () => {
    try {
      await fetch('/backend/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white'>
      <h1 className='text-4xl font-bold mb-8'>Sign Up</h1>

      <form className='flex flex-col gap-4 max-w-md w-full' onSubmit={handlesubmit}>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
          onChange={handlechange}
        />

        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
          onChange={handlechange}
        />

        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
          onChange={handlechange}
        />

        <button
          className='bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg uppercase font-semibold disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-600'
        >
          Submit
        </button>
        <OAuth />
      </form>

      <div className='mt-4 text-sm'>
        <p>Have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
      </div>

      <div className='flex justify-between mt-5'>
        <span onClick={handlesignout} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

      <p className='mt-4 text-red-500'>{error && "Something went wrong!"}</p>
    </div>
  );
}
