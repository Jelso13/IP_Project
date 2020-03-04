import React, { useState } from "react"
import {navigate } from "gatsby"
import Cookies from "universal-cookie";
import SEO from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Jumbotron } from "react-bootstrap"

const LoginPage = () => {
    const cookies = new Cookies();
    const [username, updateUsername] = useState("")
    const [password, updatePassword] = useState("")
    const loginHandler = (event) => {
        event.preventDefault();
        if(username && password){
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
              cookies.set("uType", data.userType, {path:'/'});
              cookies.set("username", username, {path:'/'});
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
          <Jumbotron style={{width:"100%", padding: "75px"}}>
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
                  <Button variant="dark" type="submit" onClick={loginHandler}>
                      Submit
                  </Button>
              </Form>
          </Jumbotron>
      </div>
    );
}
export default LoginPage