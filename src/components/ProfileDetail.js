import React, {useState, useEffect} from 'react'
import './style/Profilepage.css'
import authConfig from './api/authConfig';


const ProfileDetail = ({user}) => {
  const [type, setType] = useState("Books missing / incorrect information");
  const [subject, setSubject] = useState();
  const [description, setDescription] = useState();
  const token = localStorage.getItem('accessToken');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/reports/' , {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({ typeOfReport : type , subject : subject, details : description }),
      })
      const data = await response.json();
      alert(data.message)
    }catch (error) {
        console.error(error);
    }};

  const handleSelectChange = e => {
    setType(e.target.value);
  };

  // const handleSelectChange = async(e) => {
  //   setType(e)
  // }

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-info">
          <img src='book-background.jpg' alt="Profile Pic" className="profile-picture" />
          <div className="profile-name">
            <h1>{user.username}</h1>
          </div>
          <div className='profile-email'>
            <h4>Email: {user.email}</h4>
          </div>
          <div className="profile-bio">
            <p>Welcome to Collec site</p>
          </div>
        </div>
        
      </div>
      <div className="reporting-container">
        <p>Report</p>
      </div>
      
      <div className="reporting-details">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-column">
            <label htmlFor="request">Choose request type</label>
            <select name="request" id="request" onChange={handleSelectChange}>
              <option value="Books missing / incorrect information">Books missing / incorrect information</option>
              <option value="Problem issue">Problem issue</option>
              <option value="Website reporting">Website reporting</option>
            </select>
          </div>
          <div className="form-column">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" value={subject}
                    onChange={e => setSubject(e.target.value)}/>
          </div>
          <div className="form-column">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" value={description}
                    onChange={e => setDescription(e.target.value)}/>
          </div>
          <div className="form-column">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default ProfileDetail;