import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './style/Category.css'
import axios from 'axios';
import BookDetails from './BookDetail';
import { bookUrl, collectionUrl } from './api/api';
import "@fontsource/nunito"; 
import "@fontsource/nunito/400.css";

const styledNunito = {
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 400,
  }

function Category() {
    const [category, setCategory] = useState('ALL');
    const [bookList, setBookList] = useState([]);


    const fetchBooks = async () => {
            try {
                const response = await fetch(bookUrl); 
                const bookListData = await response.json();
                // const updatedBookList = bookListData.data.map((bookList, index) => ({
                //     ...bookList,
                //     id: index + 1
                //     }));
                setBookList(bookListData);
            } catch (err) {
              console.log('Error fetching book details:', err);
            }
            setCategory('ALL')
          };

    useEffect(() => {
        fetchBooks();
    }, []);

     const handleClick = async(e) => {
        try {
            setCategory(e)
            const response = await fetch(bookUrl + '/category', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category : e }),
            })
            const bookListData = await response.json();
            setBookList(bookListData);
            } catch (error) {
            console.log('Error adding book:', error);
        }
      };
    

     
  return (
    <div>
        <ul className="category-menu">
            <li className="category-item">
                <NavLink to='/books' className='cate-links' style={styledNunito} onClick={fetchBooks} activeClassName='bar-active' exact>
                    ALL
                </NavLink>     
            </li>
            <li className="category-item">
                <NavLink to='/books' className='cate-links' style={styledNunito} onClick={(e) => handleClick(e.currentTarget.textContent)} activeClassName='bar-active' exact>
                    FICTION
                </NavLink>  
            </li>
            <li className="category-item">
                <NavLink to='/books' className='cate-links' style={styledNunito} onClick={(e) => handleClick(e.currentTarget.textContent)} activeClassName='bar-active' exact>
                    NON-FICTION
                </NavLink>  
            </li>
            <li className="category-item">
                <NavLink to='/books' className='cate-links' style={styledNunito} onClick={(e) => handleClick(e.currentTarget.textContent)} activeClassName='bar-active' exact>
                    HISTORY
                </NavLink>  
            </li>
            <li className="category-item">
                <NavLink to='/books' className='cate-links' style={styledNunito} onClick={(e) => handleClick(e.currentTarget.textContent)} activeClassName='bar-active' exact>
                    HORROR & THILLER
                </NavLink>  
            </li>
            <li className="category-item">
                <NavLink to='/books' className='cate-links' style={styledNunito} onClick={(e) => handleClick(e.currentTarget.textContent)} activeClassName='bar-active' exact>
                    COMIC & GRAPHIC NOVEL
                </NavLink>  
            </li>
            <li className="category-item">
                <NavLink to='/books' className='cate-links' style={styledNunito} onClick={(e) => handleClick(e.currentTarget.textContent)} activeClassName='bar-active' exact>
                    EDUCATION
                </NavLink>  
            </li>
            <li className="category-item">
                <NavLink to='/books' className='cate-links' style={styledNunito} onClick={(e) => handleClick(e.currentTarget.textContent)} activeClassName='bar-active' exact>
                    POLITIC
                </NavLink>  
            </li>
        </ul>
        
        <div className="category-text">
            <h1>{category}</h1>
        </div>

        <div className="books-container">
            {bookList.map(bookList => (
                <div className="book-item" key={bookList.id}> 
                    <BookDetails bookList={bookList} />
                    
                </div>
            ))}
    
        </div>
        
    </div>
  )
}

export default Category