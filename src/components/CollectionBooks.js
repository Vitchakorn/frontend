import React, { useState, useEffect } from 'react';
import { bookUrl } from './api/api';
import authConfig from './api/authConfig';
import CollectionDetails from './CollectionDetail';
import AddCollection from './AddBook';
import CollectBookImg from './CollectBookImg';

function CollectionBooks({bookList}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [colBook, setColBook] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/books/' + bookList); // Replace with your backend API endpoint to retrieve book details
            const bookListData = await response.json();
            setColBook(bookListData);
            setIsLoading(false)
        } catch (err) {
          console.log('Error fetching book details:', err);
        }};
        fetchBooks();


    }, []);


  
if (isLoading) {
    return (
        <>
          <div>
          </div>
        </>
    )
} else{

  return (
    <div className='collect-book-info'>
        <div className='collect-book-img'>
          <CollectBookImg bookList={colBook} />
        </div> 
        <div className="collect-book-name">
          <h2>{colBook.name}</h2>
        </div>
        <div className="collect-book-author">
          <h3>{colBook.author}</h3>
        </div>       
    </div>
  );
}
};

export default CollectionBooks;
