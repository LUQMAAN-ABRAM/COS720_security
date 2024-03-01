import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  const [formdata, setformdata] = useState({});
  const handlechange = (e) => {
    setformdata({...formdata, [e.target.id]: e.target.value
    });
  };

  const handlesubmit = async(e) =>{
    e.preventDefault();
    const res = await fetch('http://localhost:3000/backend/auth/signup', formdata);
    const data = await res.json();
    console.log(data);
    
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>

      <form className='flex flex-col gap-4' onSubmit={handlesubmit}>
        <input
         type='text'
         placeholder='Username'
         id='username'
         className='bg-slate-100 p-3 rounded-lg' 
         onChange={handlechange}/>

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
      </form>
      <div>
        <p>Have an account?</p>
        <Link to='/Login'>
        <span className='text-blue-500'>Login</span>
        </Link>
      </div>
      </div>
  )
}
