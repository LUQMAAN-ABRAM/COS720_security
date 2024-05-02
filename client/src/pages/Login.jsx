import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signinstart, signinsuccess, signinfailure } from '../redux/user/UserSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';

export default function Login() {
  const [formdata, setformdata] = useState({});
  const {error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlechange = (e) => {
    setformdata({...formdata, [e.target.id]: e.target.value
    });
  };

  const handlesubmit = async(e) =>{
    e.preventDefault();
    try{
      dispatch(signinstart());
      const res = await fetch('/backend/auth/login', {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(signinfailure(data.message));
        return;
      }
    dispatch(signinsuccess(data));
    navigate('/Home');
      
    } catch (error){
      dispatch(signinfailure(error));

    }
    
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>

      <form className='flex flex-col gap-4' onSubmit={handlesubmit}>
  

        <input
         type='email'
         placeholder='Email'
         id='email'
         className='bg-slate-100 p-3 rounded-lg'
         onChange={handlechange}/>

        <input 
        type='password' 
        placeholder='Password' 
        id='password' 
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handlechange}/>

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Submit</button>
        <OAuth/>
      </form>
      <div>
        <p>Dont have an account?</p>
        <Link to='/SignUp'>
        <span className='text-blue-500'>SignUp</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error?  "User not found!" : ""}</p>
      </div>
  );
}
