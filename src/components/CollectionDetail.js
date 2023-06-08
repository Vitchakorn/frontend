// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { collectionUrl } from './api/api';

// const BookDetail = () => {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5001/api/contacts/647af7eb58168cda4bbd3db7')
//       .then(res => res.json())
//       .then(data => setContacts(data))
//   }, [])
  
//   console.log(contacts)

//   return (
//     <div>
//       <h2>Contacts</h2>
//       {contacts.map((contacts) => (
//         <div key={contacts._id}>
//           <h3>{contacts.name}</h3>
//           <p>Email: {contacts.email}</p>
//           <p>Phone: {contacts.phone}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookDetail;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BookImage = () => {
//     const [imageUrl, setImageUrl] = useState('');

//     const backendUrl = 'http://localhost:5001'
//     const bookId = "647b186e29307670a9ced694"

//   useEffect(() => {
//     // Fetch the image URL from the backend
//     const fetchImageUrl = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/books/${bookId}/image`, {
//           responseType: 'arraybuffer',
//         });

//         const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
//         const url = URL.createObjectURL(imageBlob);
//         setImageUrl(url);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchImageUrl();

//     // Clean up the URL when component unmounts
//     return () => {
//       URL.revokeObjectURL(imageUrl);
//     };
//   }, [bookId, backendUrl]);

//   return (
//     <div>
//       {imageUrl && <img src={imageUrl} alt="Book" />}
//     </div>
//   );
// };

// export default BookImage;


import React, { useState, useEffect } from 'react';
import { bookUrl } from './api/api';
import BookDetails from './BookDetail';
import './style/Category.css'
import CollectionBooks from './CollectionBooks';


function CollectionDetails({collectionList}) {
  const [bookList, setBookList] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState();
  const collectionBooks = collectionList.books
  const token = localStorage.getItem('accessToken');

  useEffect(() => {

    const fetchBooks = async () => {
        try {
            const response = await fetch(bookUrl); // Replace with your backend API endpoint to retrieve book details
            const bookListData = await response.json();
            // const updatedBookList = bookListData.data.map((bookList, index) => ({
            //     ...bookList,
            //     id: index + 1
            //     }));
            setBookList(bookListData);
        } catch (err) {
          console.log('Error fetching book details:', err);
        }
      };
  
    fetchBooks();



  }, []);


  const handleUpdate = async e => {
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:5001/api/collections/' + collectionList._id, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({ name : newName }),
    });
    window.location.reload();
  } catch (error) {
    console.log('Error adding book:', error);
  }
  }

  const handleDelete = async e => {
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:5001/api/collections/' + collectionList._id, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
      },
      // body: JSON.stringify({ name : collectionName }),
    });
    window.location.reload();
  } catch (error) {
    console.log('Error adding book:', error);
  }
  }

  const handleDeleteBook = async bookList => {
    try {
      const response = await fetch('http://localhost:5001/api/collections/' + collectionList._id + '/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({ id : bookList }),
      });
      window.location.reload();
    } catch (error) {
      console.log('Error deleting book:', error);
    }
  }

  const handleButtonClick = () => {
    setShowBooks(!showBooks);
  };

  const handleEditClick = async(e) => {
    setEditName(!editName);
  }

  return (
      <div className="collection-con">
        <div className="collection-item">
          {editName ? (
            <form onSubmit={handleUpdate} className="form-inline collection-name-edit">
              <input 
                type="text" 
                id="new-name" 
                value={newName} 
                onChange={e => setNewName(e.target.value)}
              />
              <button
                type="submit"
                variant="contained"
              >
                send
              </button>
            </form>
            ):(
            <div className="collection-name" onClick={handleButtonClick}>
              <h2>{collectionList.name}</h2>
            </div>
            )}
          <h2 className="collection-edit" onClick={handleEditClick}>Edit</h2>
          <h2 className="collection-delete" onClick={handleDelete}>delete</h2>
          
      

          {showBooks &&
          
          <div className="collect-books-container" >
            <div className="collect-books-name">
              <h2>{collectionList.name}</h2>
            </div>
            <div className="collect-books-list">
              <div className="close-books-container" onClick={handleButtonClick}>
                <h2>{`<`}</h2>
              </div>
              {collectionBooks.map(bookList => (
                  <div className="collect-book-item" key={bookList}>
                    <CollectionBooks bookList={(bookList)} />
                    <div className="collect-book-delete">
                      <h1 onClick={() => handleDeleteBook(bookList)}>delete</h1>
                    </div> 
                  </div>
                  
              ))}
            </div>
          </div>}

            

        </div>
      </div>
        

  );
};

export default CollectionDetails;
