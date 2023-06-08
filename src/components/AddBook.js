import React, {useEffect, useState} from 'react'
import './style/Collectionpage.css'
import { collectionUrl } from './api/api';
import authConfig from './api/authConfig';
import CollectionDetails from './CollectionDetail';
import './style/AddBook.css'

function AddCollection({bookId}) {
  const [collectionList, setCollectionList] = useState([]);
  const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchcollections = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/collections/', authConfig); // Replace with your backend API endpoint to retrieve book details
                console.log(response)
                const collectionListData = await response.json();
                console.log(collectionListData)
                setCollectionList(collectionListData);
            } catch (err) {
              console.log('Error fetching collection details:', err);
            }
          };
      
        fetchcollections();
    }, []);

    const handleAddBook = async (collectionId) => {
        try {
          const response = await fetch('http://localhost:5001/api/collections/'+ collectionId + '/book', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({ id: bookId })
          });
          const data = await response.json();
          alert(data.message)
        } catch (error) {
          console.log('Error adding book:', error);
        }
      };

  return (
    <div className="add-collection-container">
      {collectionList.map(collectionList => (
        <div className='collection'>
          <h2 onClick={() => handleAddBook(collectionList._id)}>{collectionList.name}</h2>
        </div>
      ))}
    </div>
    
  )
}

export default AddCollection