import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth';
import SearchForm from './SearchForm'
import Search from './Search'

const isActive = (history,path) => {
  if(history.location.pathname === path){
    return {color: '#3980CC'}
  } else {
    return {color: '#ffff'}
  }
}

function Navbar({history}) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" style={isActive(history, '/')} to="/">MicheleMake</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav mr-auto">

          <li className="nav-item active">
              <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">Shop <span className="sr-only">(current)</span></Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item active">
              <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">Dashboard <span className="sr-only">(current)</span></Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item active">
              <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">AdminDashboard <span className="sr-only">(current)</span></Link>
            </li>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
              <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Signin</Link>
            </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
              <span className="nav-link" style={{cursor: 'pointer', color: '#ffff'}}
                onClick={() => signout(() => {
                  history.push("/")
                })}>SignOut</span>
            </li>
            )}

          </ul>
           {/* <Search /> */}


        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar);
