import React,{useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories, getFilteredProducts} from './apiCore'
import CheckBox from './CheckBox'
import {prices} from './fixedPrice'
import RadioBox from './RadioBox';


function Shop() {

  const [myFilters, setMyFilters]= useState({
    filters: {category: [], price: []}
  });
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])

  const init = () => {
    getCategories().then(data => {
      if(data.error){
        setError(data.error)
      } else {
          setCategories(data)
      }
    })
  }

  const loadFilteredResults = (newFilters) => {
  // console.log(newFilters)
  getFilteredProducts(skip, limit, myFilters.filters)
    .then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMore = () => {
    let toSkip = skip + limit
    
    getFilteredProducts(toSkip, limit, myFilters.filters)
      .then(data => {
        if(data.error) {
          setError(data.error);
        } else {
          setFilteredResults([...filteredResults, ...data.data])
          setSize(data.size)
          setSkip(toSkip)
        }
      })
    }

  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && (
        <button onClick={loadMore} className="btn btn-info mb-5"> Load More </button>
      )
    )
  }

  useEffect(() => {
    init()
    loadFilteredResults()
  }, [])

  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy)
    const newFilters = { ...myFilters}
    newFilters.filters[filterBy] = filters

    if(filterBy == "price"){
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
  }

  const handlePrice = (value) => {
    const data = prices
    let array = []

    for(let key in data){
      if(data[key]._id === parseInt(value)){
        array = data[key].array;
      }
    }
    return array;
  }


  return (
    <Layout title="Shop Page" description="Find Crochet Premium"
     className="container-fluid">
      
        <div className="row">
          <div className="col-3">
          <legend>By Categories</legend>
            <ul>
              <CheckBox 
                categories={categories}
                handleFilters={filters => handleFilters(filters, 'category')}/>
            </ul>

            <legend>By Price</legend>
            <div>
              <RadioBox 
                prices={prices}
                handleFilters={filters => handleFilters(filters, 'price')}/>
            </div>
          </div>
          <div className="col-9">
          <legend>Products</legend>
            <div className="row"> 
              {filteredResults.map((product, i) => (
                
                  <Card key={i} product={product}/>
                
              ))}
            </div>
                <hr />
            {loadMoreButton()}

          </div>
        </div>
    </Layout>
  )
}

export default Shop
