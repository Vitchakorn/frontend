import React, { useState, useEffect } from 'react';
import { bookUrl } from './api/api';
import authConfig from './api/authConfig';



function BookDetails({bookList}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [showCollection, setShowCollection] = useState(false);
  const [addCollectList, setCollectionList] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/books/' + bookList._id + '/image');
        const imageBlob = await response.blob();
        const url = URL.createObjectURL(imageBlob);
        setImageUrl(url);
      } catch (error) {
        console.error(error);
      }};

      fetchImage();
    }, [bookList]);
    
    const handleDeleteBook = async bookList => {
      try {
        console.log(bookList)
        const response = await fetch('http://localhost:5001/api/books/' + bookList, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        window.location.reload();
      } catch (error) {
        console.log('Error deleting book:', error);
      }
    }

  return (
    <div>
        <div className='edit-book-img'>
          {bookList.image && (
            <img src={imageUrl} alt="bookImg" className='Book-img' />
          )}
        </div>
        <div className="edit-book-name">
          <h2>{bookList.name}</h2>
        </div>
        <div className="edit-book-author">
          <h3>{bookList.author}</h3>
        </div>
        <div className="edit-book-delete">
          <h2 onClick={() => handleDeleteBook(bookList._id)}>delete</h2>
        </div>
        
    </div>
  );
};

export default BookDetails;
