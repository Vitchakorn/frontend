import React from 'react';
import { Link } from 'react-router-dom';
import './style/AdminSidebar.css'; // CSS file for styling

const Sidebar = () => {

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li className='sidebar-reported'>
          <Link to="/report">Reported</Link>
        </li>
        <li className='sidebar-edit-book'>
          <Link to="/editedBook">Edit book</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;