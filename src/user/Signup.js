import React,{useState} from 'react'
import Layout from '../core/Layout'
import {signup} from '../auth'
import {Link} from 'react-router-dom'

function Signup() {
  const [values,setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const {name,email,password,success,error} = values;

  const handleChange = name => event => {
    setValues({...values, error: false,
                [name]: event.target.value 
              })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error: false})
    signup({name, email, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, success: false})
      } else {
        setValues({
           ...values,
           name: '',
           email: '',
           password: '',
           error: '',
           success: true
        })
      }
    })
  }

  const signUpform = () => (
    <form>
      <fieldset>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input onChange={handleChange('name')} type="text" className="form-control" placeholder="Enter Name"
            value={name}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input onChange={handleChange('email')} type="email" className="form-control" 
          id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
          value={email} />
          <small id="emailHelp" className="invalid-feedback">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={handleChange('password')} type="password" className="form-control"
           id="exampleInputPassword1" placeholder="Password" 
           value={password} />
        </div>

        <button onClick={clickSubmit} type="submit" className="btn btn-primary">Submit</button>
      </fieldset>
    </form>
  )
  const showError = () => (
    <div className="alert alert-dismissible alert-secondary"
      style={{display: error ? '' : 'none'}}>
        {error}
    </div>
  )
  const showSuccess = () => (
    <div className="alert alert-dismissible alert-primary"
      style={{display: success ? '' : 'none'}}>
      <strong>success to signup </strong>please sign in <Link to="/signin" className="alert-link">Click here</Link> 
      <button type="button" className="close" data-dismiss="alert">&times;</button>
    </div>
  )
  return (
    <Layout title="Signup page" description="Sign to check up everythings"
    className="container col-md-7 offset-3">
      {showSuccess()}
      {showError()}
      {signUpform()}
        {/* {JSON.stringify(values)} */}
    </Layout>
  )
}

export default Signup;