import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

function UserDashBoard() {
  const {user: {_id,name,email,role}} = isAuthenticated()

  const userLinks = () => {
    return (
      <div >
      <div className="card-header bg-dark">User Links</div> 
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart"> My Cart</Link>
          </li>
          <li className="list-group-item">
          <Link className="nav-link" to="/profile/update"> Update Profile</Link>
          </li>
        </ul>
      </div>
    )
  }

  const userInfo = () => {
    return (
      <div>
      <div className="card-header bg-info">User Info</div> 
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}}</li>
          <li className="list-group-item">{role === 1 ? 'Admin' : 'Registerd User'}</li>
        </ul>
      </div>
    )
  }

  const purchaseHistory = () => {
    return (
      <div>
      <div className="card-header bg-warning">Purchase History</div> 
        <ul className="list-group list-group-flush">
          <li className="list-group-item">History</li>
        </ul>
    </div>
    )
  }

  return (
    <Layout title="Dashboard" description={`good day ${name} !`}
    className="container">
      
      
        <div className="row">
          <div className="col-3">{userLinks()}</div>
          <div className="col-9">
            {userInfo()}
            {purchaseHistory()}
          </div>
        </div>
        
    
    </Layout>
  )
}

export default UserDashBoard;
