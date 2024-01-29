import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  SelectUserById, editUser, getStatus } from './store/userSlice';
import { useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const EditPage = () => {
  // Extract data from props
  const {state}=useLocation()
  const status=useSelector(getStatus)
  const userId = state && state.id;
  console.log(userId)
  const data =useSelector((state)=>SelectUserById(state,userId)) 
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch=useDispatch()
  // State to manage the form data
  const [formData, setFormData] = useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    password: data.password || '',
    confirmPassword: data.confirmPassword || '',
   
    hobbies: data.hobbies || '',
    location: data.location || '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(s)
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    console.log(data._id)
    dispatch(editUser({id:data._id,formData}))
    setFormData({
      firstName: '',
    lastName:  '',
    password: '',
    confirmPassword: '',
   
    hobbies:  '',
    location: '',
    });
   
    
  }
  useEffect(()=>{
    if(status==="edited")
    history('/')
  },[status,history])
  // Your form submission logic can go here

  return (
    <div className="edit-details-container">
      <h2>Edit Page</h2>
      <form>
        <div >
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
       
        <div>
          <label>Hobbies:</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div><button type="submit" onClick={handleSubmit}>Submit</button></div>
        
       {errorMessage &&<div  id="err" className='input-row'>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default EditPage;
