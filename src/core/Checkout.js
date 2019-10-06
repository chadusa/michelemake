import React,{useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'


function Checkout({products}) {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  }

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success"> Checkout </button>
    ) : (
      <Link to="/signin"><button className="btn btn-primary"> Sign in </button></Link>
    )}
  
  return (
    <div>
      <h3>Total: ${getTotal()}</h3>
      {showCheckout()}
    </div>
  )
}

export default Checkout