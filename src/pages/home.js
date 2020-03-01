import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import {Button} from 'react-bootstrap';
import CookieChecker from "../components/CookieChecker"

const HomePage = ({location}) => {
  const cookies = new Cookies();
  console.log(cookies.getAll());
  var uType = cookies.get("uType");
  var userName = cookies.get("username");
  // alert(location.state);
  useEffect(() => {
    if (location.state == null && cookies.get("username") == null) {
      navigate("/404");
    }
  })
  const username = cookies.get("username");
  const userType = cookies.get("uType");

  console.log(userType);

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
    <p>{"You have now logged in as "+userType}</p>
  </Layout>);
}

export default HomePage
