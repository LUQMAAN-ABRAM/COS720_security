import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState(false);
  const handlechange = (e) => {
    setformdata({...formdata, [e.target.id]: e.target.value
    });
  };

  const handlesubmit = async(e) =>{
    e.preventDefault();
    try{
      seterror(false);
      const res = await fetch('/backend/auth/signup', {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        seterror(true);
        return;
      }
      
      
    } catch (error){
      seterror(true);

    }
    
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
        <OAuth/>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to='/Login'>
        <span className='text-blue-500'>Login</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went wrong!"}</p>
      </div>
  )
}
