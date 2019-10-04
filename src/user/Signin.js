import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {signin,authenticate} from '../auth'


function Signin() {
  const [values,setValues] = useState({
    email: 'michele@gmail.com',
    password: 'test1234',
    error: '',
    loading: false,
    redirectToReferrer: false
  })

  const {email,password,loading,error,redirectToReferrer} = values;

  const handleChange = name => event => {
    setValues({...values, error: false,
                [name]: event.target.value 
              })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error: false, loading: true})
    signin({ email, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, loading: false})
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
           redirectToReferrer: true
         })
        })
      }
    })
  }

  const signUpform = () => (
    <form>
      <fieldset>
        
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
  const showLoading = () => (
    loading && (<div className="alert alert-dismissible alert-info">
      <h2>Loading ....</h2>
    </div>)
  )
  const redirectUser = () => {
    if(redirectToReferrer){
      return <Redirect to="/"/>
    }
  }
  return (
    <Layout title="Signin page" description="Sign in check up good products"
    className="container col-md-7 offset-3">
      {showLoading()}
      {showError()}
      {signUpform()}
      {redirectUser()}
        {/* {JSON.stringify(values)} */}
    </Layout>
  )
}

export default Signin;