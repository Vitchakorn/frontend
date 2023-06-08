import React from 'react'
import '../App.css'
import { Button } from './Button'
import { Link } from 'react-router-dom';
import'./style/HeroSection.css'
import "@fontsource/roboto";

const styledRoboto = {
  fontFamily: 'Roboto, sans-serif',
}

function HeroSection() {
  return (
    <div className='hero-container'>
        <img src='/book-background.jpg' id='bg-img'></img>
        <div className="hero-content">
            <h1 style={styledRoboto}>Collecting your books</h1>
            <p style={styledRoboto}>start here</p> 
            <div className="hero-btns">
              <Link to='/books'>
                <Button className='btns' buttonStyle='btn--outline' 
                buttonSize='btn--large'>DISCOVER</Button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default HeroSection;