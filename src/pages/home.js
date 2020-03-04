import React, { useEffect, useState } from "react"
import {navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import CookieChecker from "../components/CookieChecker"
import PatientComponent from "../components/PatientComponent"
import ReceptionistComponent from "../components/ReceptionistComponent"

// import patientComponents from "../components/patientComponents"
// import receptionistComponents from "../components/receptionistComponents"

const HomePage = ({location}) => {
  // console.log(cookies.getAll());

  const [currentTab, changeTab] = useState("home");
  const cookies = new Cookies();

  // fetch calls should be in useEffect
  useEffect(() => {
    const cookies = new Cookies();
    if (location.state == null && cookies.get("username") === undefined) {
      navigate("/404");
    }
  }, [location.state])

  const username = cookies.get("username");
  const userType = cookies.get("uType");
  return (
    <Layout headerChoice={userType} changeTab={changeTab}>
    <CookieChecker />
    <SEO title="Home"/>
    <h1>{"Welcome " + username}</h1>
    <p>{"You have now logged in as "+userType}</p>
      {userType==="patient" ? <PatientComponent currentTab={currentTab} /> : <ReceptionistComponent />}
  </Layout>);
}

export default HomePage
