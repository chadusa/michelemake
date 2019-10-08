import React, { useState, useEffect } from "react";
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom';
import {getPurchaseHistory} from './apiUser';
import moment from "moment";


function UserDashBoard() {

  const [history, setHistory] = useState([]);
  const {user: {_id,name,email,role}} = isAuthenticated()

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setHistory(data);
        }
    });
};

useEffect(() => {
  init(_id, token);
}, []);

  const userLinks = () => {
    return (
      <div >
      <div className="card-header bg-dark">User Links</div> 
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart"> My Cart</Link>
          </li>
          <li className="list-group-item">
          <Link className="nav-link" to={`/profile/${_id}`}> Update Profile</Link>
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

  const purchaseHistory = (history) => {
    return (
      <div>
      <div className="card-header bg-warning">Purchase History</div> 
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                  <div>
                      <hr />
                      {h.products.map((p, i) => {
                          return (
                              <div key={i}>
                                  <h6>Product name: {p.name}</h6>
                                  <h6>
                                      Product price: ${p.price}
                                  </h6>
                                  <h6>
                                      Purchased date:{" "}
                                      {moment(
                                          p.createdAt
                                      ).fromNow()}
                                  </h6>
                              </div>
                          );
                      })}
                  </div>
              );
            })}
          </li>
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
            {purchaseHistory(history)}
          </div>
        </div>
        
    
    </Layout>
  )
}

export default UserDashBoard;
