import React, { useState } from 'react'
import SignupForm from '../../../components/SignupForm/SignupForm'
import './Signup.css'
import Split from "react-split"


const Signup = (props) => {
  const [message, setMessage] = useState()

  const updateMessage = msg => {
    setMessage(msg)
  }

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
        <h1>Sign Up</h1>
        {message && <p>{message}</p> }
        <SignupForm 
          updateMessage={updateMessage}
          handleSignupOrLogin={props.handleSignupOrLogin}
        />
      </div>

    </Split>
   
  )
}

export default Signup
