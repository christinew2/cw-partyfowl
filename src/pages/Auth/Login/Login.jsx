import React from 'react'
import LoginForm from '../../../components/LoginForm/LoginForm'
import './Login.css'
import Split from "react-split"

// import '../../../components/images/jpg-draft1.jpg' 


const LoginPage = (props) => {
  return (
    <Split
      className="split"
      sizes={[55,45]}
      minSize={550}
      maxSize={1000}
      gutterSize={10}
    >
      <div className="login-left">
        <div className="login-title-cover">
          <h1 className="login-title">PartyFowl</h1>
          <p className="description">
            Join the flock of party-goers in finding events near you with ease!
          </p>
        </div>
      </div>
      <div className="login-right">
        <h1>Log In</h1>
        <LoginForm handleSignupOrLogin={props.handleSignupOrLogin}/>
      </div>

    </Split>
  )
}
 
export default LoginPage
