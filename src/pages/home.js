import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import {Button} from 'react-bootstrap';
import CookieChecker from "../components/CookieChecker"

const HomePage = ({location}) => {
  const cookies = new Cookies();
  // console.log(cookies.getAll());
  var uType = cookies.get("uType");
  var userName = cookies.get("username");

  // fetch calls should be in useEffect
  useEffect(() => {
    if (location.state == null && cookies.get("username") == undefined) {
      navigate("/404");
    }
  }, [])

  const username = cookies.get("username");
  const userType = cookies.get("uType");

  console.log(userType);

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
