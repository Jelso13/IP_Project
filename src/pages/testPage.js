import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const IndexPage = () => {

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
    <h1>Welcome</h1>
    <p>This is some test text for the index page</p>
    <div><Button onClick={testButtonFunction} variant="dark">Test Button</Button></div>
    <div><Button onClick={getAdmin} variant="dark">return admin details</Button></div>
    <Link to="/page-2/">Go to page 2</Link>
    <h2>Login page</h2>
    <Link to="/login-page/">Go to Login page</Link>
  </Layout>);
}


export default IndexPage
