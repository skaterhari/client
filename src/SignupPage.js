// SignupPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAllUsers, getStatus, signUpUser } from './store/userSlice';
import { useEffect } from 'react';
const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const status=useSelector(getStatus)
  const dispatch=useDispatch()
const navigate=useNavigate()
let u=useSelector(SelectAllUsers);
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your signup logic here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    try {
      // Make a POST request to the server
     
      await dispatch(signUpUser({ firstName, lastName, email, password, confirmPassword }))
  
      let x=u.find(user=> user.email===email && user.password===password)
      if(x)
      {
        console.log(x._id)
        navigate('/userDetailPage',{ state: { id: x._id } });
      }
     
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle unexpected errors here
    }
    console.log('Signup submitted:', { firstName, lastName, email, password, confirmPassword });
  };
  useEffect(() => {
    if (status === 'signed-in') {
      // Assuming the latest user is the newly signed up user
      const latestUser = u.find(user => user.email === email && user.password === password);

      if (latestUser) {
        navigate('/userDetailPage', { state: { id: latestUser._id } });
      }
    }
  }, [status, email, password, u, navigate]);
  return (
    <div className="signup-container">
        
      <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
        <div className="input-row">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-row">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-row">
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-row">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="input-row">
          <button type="submit">Sign Up</button>
        </div>
        <div className="signup-link">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
