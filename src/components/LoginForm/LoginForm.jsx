import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './LoginForm.css'
import * as authService from '../../services/authService'

const LoginForm = (props) => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    authService.login(formData)
    .then(() => {
      props.handleSignupOrLogin()
      history.push('/')
    })
    .catch(err => {
      alert('Invalid Credentials')
    })
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="login-form"
    >
      <div className="login-input">
        <label htmlFor="email-input" className="login-label">
          Email
        </label>
        <input
          type="text"
          autoComplete="off"
          id="email-input"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="login-input">
        <label htmlFor="password-input" className="login-label">
          Password
        </label>
        <input
          type="password"
          autoComplete="off"
          id="password-input"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="login-buttons">
        <button className="login-button">Log In</button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}
 
export default LoginForm
