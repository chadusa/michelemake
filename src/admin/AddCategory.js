import React, {useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {createCategory} from './apiAdmin';

function AddCategory() {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const {user, token} = isAuthenticated()

  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('')
    setSuccess(false)
    // API  call
    createCategory(user._id, token, {name})
    .then(data => {
      if(data.error){
        setError(true);
      } else {
        setError("");
        setSuccess(true)
      }
    })
  }

  const showSuccess = () => {
    if(success){
      return (
        <span className="alert alert-dismissible alert-primary">
          {name} is created
      </span>
      )
    }
  }
  const showError = () => {
    if(error){
      return (
        <span className="alert alert-dismissible alert-danger">
          {name} category should be unique
      </span>
      )
    }
  }
  // const goBack = () => (
  //   <span className="text-worning">
  //         <Link to="/admin/dashboard" > Back to Dashboard</Link>
  //     </span>
  // )

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
          <label >Name </label>
          <input onChange={handleChange} type="name" className="form-control" 
           placeholder="Enter Name" value={name} autoFocus required />
          
      </div>
      <button type="submit" className="btn btn-primary">Create Category</button>
    </form>
  )

  return (
     <Layout title="Add a new category" description={`${user.name} !`}
      className="container">

          <div className="row">
            <div className="col-9">
            {showSuccess()}
            {showError()}
            
            {newCategoryForm()}</div>
            
          </div>
    </Layout>
  )
}

export default AddCategory
