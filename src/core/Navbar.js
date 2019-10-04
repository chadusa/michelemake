import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth';

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
            {/* <li className="nav-item active">
              <Link className="nav-link" style={isActive(history,'/')} to="/">Home <span className="sr-only">(current)</span></Link>
            </li> */}
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
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar);
