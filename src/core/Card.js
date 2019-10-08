import React, {useState} from 'react'
import { Link , Redirect} from "react-router-dom";
import ShowImage from './ShowImage'
import moment from 'moment';
import {addItem, updateItem ,removeItem} from './CartHelpers'


function Card({product, showViewProductButton = true,
   showAddToCartButton = true, cartUpdate = false,
   showRemoveProductButton = false,
   setRun = f => f, // default value of function
   run = undefined // default value of undefined
  }) {

  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
          View 
          </button>       
       </Link>
      )
    )
  }
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger"
        >
          Remove 
        </button>
      )
    );
  };


  const showStock = (quantity) => {
    return quantity > 0 ? (
    <span className="badge badge-primary badge-pill mr-2">In Stock</span>
    ) : (
    <span className="badge badge-danger badge-pill mr-2">Out of Stock</span>
    ) 
  }

  const handleChange = (productId) => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if(event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
      <div>
          <div className="input-group">
              <div className="input-group-prepend">
                  <span className="badge badge-warning badge-pill">
                      Adjust Quantity
                  </span>
              </div>
              <input
                  type="number"
                  className="form-control mr-sm-2"
                  value={count}
                  onChange={handleChange(product._id)}
              />
          </div>
      </div>
      )
    );
};

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = () => {
    if(redirect){
      return <Redirect to="/cart" />
    }
  }

  const showAddToCart = (showAddToCartButton) => {
    return showAddToCartButton &&
    <button onClick={addToCart} className="btn btn-outline-danger mt-2 mb-2">
      Add to card
    </button>
  }

  return (
    <div className="border-primary mb3 mr-3" style={{maxWidth: '21rem'}}>
      
        <div className="card border-warning">
            <div className="card-header">{product.name}</div>
            <div className="card-body">
              {shouldRedirect(redirect)}
              <ShowImage item={product} url="product"/>
                <p className="card-text">{product.description.substring(0, 80)}</p>
                
                <p className="card-text"> Price: ${product.price}</p>
                <p className="card-text"> Category: {product.category && product.category.name}</p>
                <p className="card-text">Added on: {moment(product.createdAt).fromNow()}</p>

                  {showStock(product.quantity)}

                  {showViewButton(showViewProductButton)}
                  {showAddToCart(showAddToCartButton)}
                  {showRemoveButton(showRemoveProductButton)}
                  {showCartUpdateOptions(cartUpdate)}
            </div>
        
      </div>
</div>
  )
}

export default Card
