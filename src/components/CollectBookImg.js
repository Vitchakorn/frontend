import React, { useState, useEffect } from 'react';
import { bookUrl } from './api/api';
import authConfig from './api/authConfig';
import CollectionDetails from './CollectionDetail';
import AddCollection from './AddBook';

function CollectBookImg({bookList}) {
  const [imageUrl, setImageUrl] = useState(null);


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


  return (
    <div>
        <div className='collect-book-img'>
          {bookList.image && (
            <img src={imageUrl} alt="bookImg" className='Book-img' />
          )}
        </div>
              
    
    </div>
  );
};

export default CollectBookImg;
