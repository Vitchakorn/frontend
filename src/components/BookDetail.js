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
import authConfig from './api/authConfig';
import CollectionDetails from './CollectionDetail';
import AddCollection from './AddBook';

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
    
    const handleButtonClick = () => {
      setShowCollection(!showCollection);
    };
    
  // const handleAddBook = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5001/api/collections/647afa3ee705d20ff970a771/book', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization' : `Bearer ${token}`
  //       },
  //       body: JSON.stringify({ id: bookList._id })
  //     });
  //     console.log(response)
  //   } catch (error) {
  //     console.log('Error adding book:', error);
  //   }
  // };



  return (
    <div>
        <div className='book-img'>
          {bookList.image && (
            <img src={imageUrl} alt="bookImg" className='Book-img' />
          )}
        </div>
        <div className="book-name">
          <h2>{bookList.name}</h2>
        </div>
        <div className="book-author">
          <h3>{bookList.author}</h3>
        </div>
        <div className="book-btn">
          {/* <button> add to collection</button> */}
          <button id='addCollect-btn' onClick={handleButtonClick}>Add to collection</button>
          {showCollection && <AddCollection bookId={bookList._id}/>}
        </div>        
        {/* <div className="collection-show">
          {addCollectList.map(collectionList => (
            <div className="collection-item"> 
              <CollectionDetails collectionList={collectionList} />
            </div>
          ))}
        </div> */}
    </div>
  );
};

export default BookDetails;
