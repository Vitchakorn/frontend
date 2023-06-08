import React, {useState, useEffect} from 'react'
import '../style/Profilepage.css'
import authConfig from '../api/authConfig';
import ProfileDetail from '../ProfileDetail';


const Profile = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/current', authConfig); // Replace with your backend API endpoint to retrieve book details
            const userData = await response.json();
            console.log(userData)
            setUser(userData);
            setIsLoading(false)
        } catch (err) {
          console.log('Error fetching collection details:', err);
        }
      };
  
      fetchCurrentUser();
}, []);

if (isLoading) {
  return (
      <>
        <div >
        </div>
      </>
  )
} else{

  return (
    <div >
      <ProfileDetail user={user} />
    </div>
  );
}
};

export default Profile;