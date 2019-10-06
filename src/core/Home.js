import React,{useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search';


function Home() {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductBySell = () => {
    getProducts('sold').then(data => {
      if(data.error){
        setError(data.error)
      } else {
        setProductsBySell(data)
      }
    })
  }
  const loadproductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if(data.error){
        setError(data.error)
      } else {
        setProductsByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadproductsByArrival()
    loadProductBySell()
  }, [])

  return (
    <Layout title="Home" description="MicheleMake Crochet Premium"
     >
      
      <div className="container">
        
        <Search />
        <h3 className="mb-4 ">New Arrival</h3>
          <div className="row">
            {productsByArrival.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>

        <h3 className="mb-4">Best Seller</h3>
          <div className="row">
            {productsBySell.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          </div>
    </Layout>
  )
}

export default Home
