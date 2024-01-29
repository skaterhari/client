// LoginPage.js
import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SelectAllUsers} from './store/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const u=useSelector(SelectAllUsers)
  console.log(u)
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const navigate=useNavigate();
  
  console.log(u)
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(s)
    if (pwd !== cpwd) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try{
      
      let x=u.find(user=> user.email===email && user.password===pwd)
      if(x)
      {
        console.log(x._id)
        navigate('/userDetailPage',{ state: { id: x._id } });
      }
      
    else{
      setErrorMessage('check credentials')
    }
      //  console.log(s)
    }
   catch(err)
   {
    console.log(err)
   }
  };

  return (
    <div className="login-container">
    
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="input-row">
          <input
            type="email"
            name='email'
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-row">
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={cpwd}
            onChange={(e) => setCpwd(e.target.value)}
          />
        </div>

         <div id='link'>Don't have an account?<Link to="/signup"> Sign Up</Link></div>  
        <div className="input-row">
       
          <button type="submit" >Login</button>
        </div>
        {errorMessage &&<div  id="err" className='input-row'>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
