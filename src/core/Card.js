import React from 'react'
import { Link } from "react-router-dom";
import ShowImage from './ShowImage'
import moment from 'moment';


function Card({product, showViewProductButton = true}) {

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

  const showStock = (quantity) => {
    return quantity > 0 ? (
    <span className="badge badge-primary badge-pill mr-2">In Stock</span>
    ) : (
    <span className="badge badge-danger badge-pill mr-2">Out of Stock</span>
    ) 
  }

  const showAddToCartButton = () => {
    return <button className="btn btn-outline-danger mt-2 mb-2">
      Add to card
    </button>
  }
  return (
    <div class="border-primary mb3 mr-3" style={{maxWidth: '21rem'}}>
      
        <div className="card border-warning">
            <div className="card-header">{product.name}</div>
            <div className="card-body">
              <ShowImage item={product} url="product"/>
                <p className="card-text">{product.description.substring(0, 80)}</p>
                
                <p className="card-text"> Price: ${product.price}</p>
                <p className="card-text"> Category: {product.category && product.category.name}</p>
                <p className="card-text">Added on: {moment(product.createdAt).fromNow()}</p>

                  {showStock(product.quantity)}

                  {showViewButton(showViewProductButton)}
                  {showAddToCartButton()}
            </div>
        
      </div>
</div>
  )
}

export default Card
