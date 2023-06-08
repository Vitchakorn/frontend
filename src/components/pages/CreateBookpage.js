import React, { useState } from 'react';
import '../style/CreateBook.css'

const CreateBook = () => {
  const [bookName, setBookName] = useState();
  const [author, setAuthor] = useState();
  const [category, setCategory] = useState("FICTION");
  const [description, setDescription] = useState();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('name', bookName);
      formData.append('author', author);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('image', e.target.elements.image.files[0]);
  
      const response = await fetch('http://localhost:5001/api/books/', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      alert('Book created:', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = e => {
    setCategory(e.target.value);
  };

  return (
    <div className="form-container">
  
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={bookName} onChange={e => setBookName(e.target.value)}/>
        </div>
        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)}/>
        </div>
        <div className="form-field">
          <label htmlFor="category">Category</label>
            <select name="request" id="request" onChange={handleSelectChange}>
              <option value="FICTION">FICTION</option>
              <option value="NON-FICTION">NON-FICTION</option>
              <option value="HISTORY">HISTORY</option>
              <option value="HORROR & THILLER">HORROR & THILLER</option>
              <option value="COMIC & GRAPHIC NOVEL">COMIC & GRAPHIC NOVEL</option>
              <option value="EDUCATION">EDUCATION</option>
              <option value="POLITIC">POLITIC</option>
            </select>
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div className="form-field">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBook;
