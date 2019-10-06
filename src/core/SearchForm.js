import React,{useState, useEffect} from 'react'
import {getCategories, list} from './apiCore'
import Card from './Card'


function Search() {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const {categories,category,search,results,searched} = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if(data.error){
        console.log(data.error)
      } else {
        setData({...data, categories: data})
      }
    })
  }
  const searchData = () => {
    // console.log(search, category)
    if(search){
      list({search: search || undefined, category: category})
        .then(response => {
          if(response.error){
            console.log(response.error)
          } else {
            setData({ ...data, results: response, searched: true})
          }
        })
    }
  }
  const searchSubmit = (event) => {
    event.preventDefault()
    searchData()
  }

  const handleChange = (name) => event => {
    setData({ ...data, [name]: event.target.value, searched: false})
  }

  // const searchProducts = (results = []) => {
  //   return (
  //     <div className="row">
  //       {results.map((product, i) => (
  //         <Card key={i} product={product}/>
  //       ))}
  //   </div>
  //   )
  // }

  const searchForm = () => (
 
    <form onSubmit={searchSubmit} className="form-inline my-2 my-lg-0">
        <span className="input-group">
                    <select
                        className="custom-select"
                        onChange={handleChange("category")}
                    >
                        <option value="All">Pick Category</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                <input
                    type="search"
                    className="form-control mr-sm-2"
                    onChange={handleChange("search")}
                    placeholder="Search by name"
                />
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </span>
    </form>
  )

  return (
    <div className="row">
      <div className="container mb3"> {searchForm()}</div>
      {/* <div className="container-fluid mb3">
         {searchProducts(results)}
      </div> */}
    </div>

  )
}

export default Search
