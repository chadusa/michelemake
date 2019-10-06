import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

function AdminDashBoard() {
  const {user: {_id,name,email,role}} = isAuthenticated()

  const adminLinks = () => {
    return (
      <div >
      <div className="card-header bg-dark">Admin Links</div> 
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category"> Create Category</Link>
          </li>
          <li className="list-group-item">
          <Link className="nav-link" to="/create/product"> Create Products </Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div>
      <div className="card-header bg-info">Admin Info</div> 
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}}</li>
          <li className="list-group-item">{role === 1 ? 'Admin' : 'Registerd User'}</li>
        </ul>
      </div>
    )
  }

  return (
    <Layout title="Dashboard" description={`good day ${name} !`}
    className="container">

        <div className="row">
          <div className="col-3">{adminLinks()}</div>
          <div className="col-9">{adminInfo()}</div>
        </div>
        
    
    </Layout>
  )
}

export default AdminDashBoard;
