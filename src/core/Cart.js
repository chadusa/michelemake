import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import { getCart } from './CartHelpers';
import Card from './Card'
import Checkout from './Checkout'


function Cart() {
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart())
  }, [run]) // items

  const showItems = (items) => {
    return (
      <div>
        <h3 className="text-muted"> you  has {`${items.length}`} items</h3>
        <hr />
        {items.map((product, i) => (
          <Card key={i} product={product} showAddToCartButton={false}
          cartUpdate={true} showRemoveProductButton={true}
          setRun={setRun}
          run={run}
          />
        ))}
      </div>
    )
  }

  const noItemsMessage = () => (
    <div>
      <h2>your cart is empty.</h2>
    <Link to="/shop"> <h4 className="text-danger">Continue shopping </h4> </Link>
    </div>
  )

  return (
    <Layout title="Shopping Cart" description="keep items to Cart"
    className="container">
      <div className="row"> 
        <div className="card-body">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="card-body">
          <h2 className="mb-4">Your cart Summary</h2>
          <Checkout products={items} />
        </div>
       </div>
    </Layout>
  )
}

export default Cart;
