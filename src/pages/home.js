import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const HomePage = ({location}) => {
  //TODO Change names and error codes... The Will paradox
  const username = location.state == null ? "bob" : location.state.currentUser;
  const userType = location.state == null ? "scrub" : location.state.uType;
  console.log(userType);

  const testButtonFunction = () => {
    const testData = { d : 'example'};
    fetch('https://europe-west1-sustained-node-257616.cloudfunctions.net/TestFunction', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    }).then(function(response) {
      return response.text();
    }).then(function(data){
      console.log(data);
    });
  }

  const getAdmin = () => {
    const testData = { "docName" : "adminAccount"};
    fetch('https://europe-west1-sustained-node-257616.cloudfunctions.net/getAdminUserTest', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    }).then(function(response) {
      return response.json();
    }).then(function(data){
      console.log(data);
    });
  }

  return (<Layout>
    <SEO title="Home"/>
    <h1>{"Welcome " + username}</h1>
    <p>You have now logged in</p>
    <p>However, some changes with cookies and a user hash is required</p>
    <Link to="/page-2/">Go to page 2</Link>
    <h1></h1>
    <Link to="/login-page/">Go to Login page</Link>
  </Layout>);
}

export default HomePage
