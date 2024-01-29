import React from 'react';
import { useSelector } from 'react-redux';
import { SelectUserById } from './store/userSlice';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
const UserDetailsPage = () => {
  const { state } = useLocation();
  const userId = state && state.id;
  const user=useSelector((state)=>SelectUserById(state,userId))
  console.log(userId)
  console.log(user)
  let fullName=''
  if(user){
     fullName  = `${user.firstName} ${user.lastName}`;
  }

  const navigate=useNavigate()
  const handleEdit=(e)=>{
    e.preventDefault()
    navigate('/edit',{ state: { id: userId}} )
  }
  return (
    <div className="user-details-container">
      <h1>User Details</h1>
      <form>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <p id="fullName">{fullName}</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <p id="email">{user.email}</p>
        </div>

        <div className="form-group">
          <label htmlFor="hobbies">Hobbies:</label>
          <p id="hobbies">{user.hobbies || 'N/A'}</p>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <p id="location">{user.location || 'N/A'}</p>
        </div>
        <div className='form-group'>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsPage;
