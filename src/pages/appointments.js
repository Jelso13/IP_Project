import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import CookieChecker from "../components/CookieChecker"

const HomePage = ({location}) => {
  // alert(location.state);
  useEffect(() => {
    if (location.state == null) {
      navigate("/404");
    }
  })

  const username = location.state == null ? "" : location.state.currentUser;
  const userType = location.state == null ? "" :location.state.uType;

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
  console.log(userType)
  return (
    <Layout headerChoice={userType}>
    <CookieChecker />
    <SEO title="Home"/>
    <h1>{"Welcome " + username}</h1>
    <p>This is the appointments page and still needs to be done, however has now been linked</p>
  </Layout>);
}

export default HomePage
