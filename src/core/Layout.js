import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles.css';


function Layout({
  title='Title',
  description='Description',
  className,
  children
  }) {
  return (
    <div>
      <Navbar />
      <div className="jumbotron">
        <h1 className="display-5">{title}</h1>
        <p className="lead">{description}</p>
        <hr className="my-4" />
        
        
      </div>
      <div>
        <div className={className}> {children} </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
