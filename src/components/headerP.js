import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { navigate } from "gatsby-link"

const HeaderPat = () => {
  const [] = useState(false);
 return ( <header
    style={{}}
  >
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto" expand={"lg"}>
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/appointments">Appointments</Nav.Link>
        <Nav.Link href="/Availability">Availability</Nav.Link>
      </Nav>
      <Nav>
        <button onClick={() => {
          const cookies = new Cookies();
          cookies.remove("username", {path: "/", domain:"elastic-visvesvaraya-23ac8d.netlify.com"});
          cookies.remove("uType", {path:"/", domain: "elastic-visvesvaraya-23ac8d.netlify.com"});
          navigate("/home")
        }}>Log out
        </button>
      </Nav>
    </Navbar>
  </header>)
}

HeaderPat.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderPat.defaultProps = {
  siteTitle: ``,
}

export default HeaderPat
