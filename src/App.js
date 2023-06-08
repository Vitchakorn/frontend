import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/pages/Homepage'
import Page404 from './components/pages/Page404';
import Bookpage from './components/pages/Bookpage';
import Collectionpage from './components/pages/Collectionpage';
import SignIn from './SignIn';
import Profilepage from './components/pages/Profilepage';

import AdminSidebar from './components/AdminSidebar';
import Navbar2 from './components/AdminNavbar2.js';
import CreateBookpage from './components/pages/CreateBookpage';
import ReportPage from './components/pages/Reportpage';
import EditBookpage from './components/pages/EditBookpage'


function App() {
  const token = localStorage.getItem("accessToken");
  const [admin, setAdmin] = useState(false);
  const isAdmin = localStorage.getItem('admin');

  useEffect(() => {
    if (isAdmin === 'true') {
      setAdmin(true);
    }
  }, [isAdmin]);

  if (!token) {
    return <SignIn />
  }


  return (
    <>
    {admin ? (
      <Router>
        <Navbar2 />
        <Routes>
          <Route path='/report' exact Component={ReportPage} />
          <Route path='/createBook' exact Component={CreateBookpage} />
          <Route path='/editBook' exact Component={EditBookpage} />
          {/* <Route path='/report' exact Component={Bookpage} />
          <Route path='/editedBook' exact Component={Homepage} /> */}
        </Routes>
      </Router>
      ) : (
        
      <Router>
        <Navbar />
        <Routes>
          <Route path='/home' exact Component={Homepage} />
          <Route path='/books' exact Component={Bookpage} />
          <Route path='/user-collection' exact Component={Collectionpage} />
          <Route path='/profile' exact Component={Profilepage} />
          <Route path="*" Component={Homepage} />
        </Routes>
      </Router>)

    }
      
    </>
      
  );
}

export default App;
