import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import SEO from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Jumbotron } from "react-bootstrap"

const LoginPage = () => {
    const [username, updateUsername] = useState("")
    const [password, updatePassword] = useState("")
    const [checkBox, updateCheckBox] = useState(false)
    const [respJson, receiveResponse] = useState()
    const loginHandler = (event) => {
        event.preventDefault()

        if(checkBox && username && password){
          const userData = { "docName" : username, "password": password};
          fetch('https://europe-west1-sustained-node-257616.cloudfunctions.net/checkLogin', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          }).then(function(response) {
            return response.json();
          }).then(function(data){
            if (data.m === "exists") {
              //Cookie shit
              navigate('/home', {state : {currentUser : username, uType : data.userType}})
              console.log(data.m);
            }
          });
        }

    }
    return (
      <div
        style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
        }}
      >
          <SEO title="Login page"/>
          <h1>Login</h1>
          <Jumbotron>
              <Form onSubmit={loginHandler}>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address or username</Form.Label>
                      <Form.Control placeholder="Enter username" onInput={e => updateUsername(e.target.value)}/>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password"
                                    onInput={p => updatePassword(p.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="I agree to the non-existent terms and conditions"
                                  onInput={e => {
                                      updateCheckBox(!checkBox)
                                  }}/>
                  </Form.Group>
                  <Button variant="dark" type="submit" onClick={loginHandler}>
                      Submit
                  </Button>
              </Form>
          </Jumbotron>
      </div>
    );
}
export default LoginPage