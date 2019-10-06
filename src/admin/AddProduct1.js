import React, {useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {createProduct} from './apiAdmin';


function AddProduct() {
  const {user , token} = isAuthenticated()
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  })

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  const handleChange = () => {

  }
  const clickSubmit = () => {

  }

  const newPostForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
          <label >Post Photo </label>
          <input onChange={handleChange} type="file" className="form-control" 
          value={photo} accept="image/*" required />
      </div>
      <div className="form-group">
          <label > Name </label>
          <input onChange={handleChange('name')} type="text" className="form-control" 
          value={name}  required />
      </div>
      <div className="form-group">
          <label > Description </label>
          <textarea onChange={handleChange('description')} type="text" className="form-control" 
          value={description}  required />
      </div>
      <div className="form-group">
          <label > Price </label>
          <input onChange={handleChange('price')} type="number" className="form-control" 
          value={price}  required />
      </div>
      <div className="form-group">
          <label > Category </label>
          <select onChange={handleChange('category')} className="form-control" >
            <option value="5d97eff77468e49e8e58a308">Dolls</option>
          </select>
      </div>
      <div className="form-group">
          <label > Shipping </label>
          <select onChange={handleChange('shipping')} className="form-control" >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
      </div>
      <div className="form-group">
          <label > Shipping </label>
          <input onChange={handleChange('shipping')} type="number" className="form-control" 
          value={shipping} />
      </div>

      <button type="submit" className="btn btn-primary">Create Category</button>
    </form>
  )

  return (
    <Layout title="Add a new Product" description={`${user.name} !`}
      className="container">

          <div className="row">
            <div className="col-9">
              {newPostForm()}
            </div>
            
          </div>
    </Layout>
  )
}

export default AddProduct
