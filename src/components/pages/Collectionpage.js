import React, {useEffect, useState} from 'react'
import '../style/Collectionpage.css'
import { collectionUrl } from '../api/api';
import authConfig from '../api/authConfig';
import CollectionDetails from '../CollectionDetail';
import { TextField } from '@mui/material';
import { bookUrl } from '../api/api';

function Collection() {
  const [collectionList, setCollectionList] = useState([]);
  const [addCollection, setAddCollection] = useState(false);
  const [collectionName, setCollectionName] = useState();
  const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchcollections = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/collections/', authConfig); // Replace with your backend API endpoint to retrieve book details
                const collectionListData = await response.json();
                setCollectionList(collectionListData);
                console.log(collectionListData)
            } catch (err) {
              console.log('Error fetching collection details:', err);
            }
          };
      
        fetchcollections();

        
    }, []);

    const handleSubmit = async e => {
      e.preventDefault();
      try {
      const response = await fetch('http://localhost:5001/api/collections/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({ name : collectionName }),
      });
      window.location.reload();
    } catch (error) {
      console.log('Error adding book:', error);
    }
    }
    //   const response = await loginUser({
    //     email,
    //     password
    //   });
    //   if ('accessToken' in response) {
        
    //     localStorage.setItem('accessToken', response['accessToken']);
    //     console.log(JSON.stringify(response['user']))
    //     localStorage.setItem('user', JSON.stringify(response['user']));
    //     window.location.href = "/home";
    //     }
    // }

    const handleClick = async(e) => {
      setAddCollection(!addCollection);
    }

  return (
    <div className="collection-container">
      <h1>My Collection</h1>
      
      {collectionList.map(collectionList => (
          <div > 
            <CollectionDetails collectionList={collectionList} />
          </div>
      ))}

      <div className="collection-add">
      {addCollection ? (
              <form onSubmit={handleSubmit}>
                <TextField 
                margin="normal"
                name="collection"
                label="collection"
                id="collection"
                autoComplete="current-password"
                value={collectionName}
                onChange={e => setCollectionName(e.target.value)}/>
                <button
                type="submit"
                variant="contained"
                id="collection-create-btn"
                sx={{ mt: 3, mb: 2 }}
                >
                send
                </button>
              </form>
            ) : (
              <div className="add-icon">
                <h2 onClick={handleClick}>+</h2>
              </div>
            )}
        
      </div>
    </div>
    
  )
}

export default Collection