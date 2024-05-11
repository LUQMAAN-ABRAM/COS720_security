import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signinstart, signinsuccess, signinfailure } from '../redux/user/UserSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';

export default function Login() {
  const [formdata, setformdata] = useState({});
  const { error } = useSelector((state) => state.user);
  const [failedAttempts, setFailedAttempts] = useState(0); // Track failed attempts
  const [errorMessage, setErrorMessage] = useState(''); // Error message for login attempt
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinstart());
      const res = await fetch('/backend/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signinfailure(data.message));
        // Increment failed attempts
        setFailedAttempts(failedAttempts + 1);
        // If failed attempts reach 3, disable submit button and show error message
        if (failedAttempts === 2) {
          setErrorMessage('You have reached the maximum number of failed attempts. Please wait for 3 minutes before trying again.');
          document.getElementById('submitBtn').setAttribute('disabled', 'disabled');
          setTimeout(() => {
            // Reset failed attempts and error message after 3 minutes
            setFailedAttempts(0);
            setErrorMessage('');
            document.getElementById('submitBtn').removeAttribute('disabled');
          }, 180000); // 3 minutes in milliseconds
        }
        return;
      }
      dispatch(signinsuccess(data));
      navigate('/Home');
    } catch (error) {
      dispatch(signinfailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>

      <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handlechange}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handlechange}
        />

        <button
          id="submitBtn"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
        >
          Submit
        </button>
        <OAuth />
      </form>
      <div>
        <p>Don't have an account?</p>
        <Link to="/SignUp">
          <span className="text-blue-500">SignUp</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && failedAttempts === 3? 'You have entered the incorrect Login details three times. Please wait for 3 minutes before trying again.' : ''}</p>
      <p className="text-red-700 mt-5">{error && failedAttempts !== 3? 'User not found!' : ''}</p>
      
    </div>
  );
}
