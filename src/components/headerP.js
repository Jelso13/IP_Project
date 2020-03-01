import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

const HeaderPat = ({ siteTitle }) => (
  <header
    style={{
    }}
  >
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto" expand={"lg"}>
        <Nav.Link href="/home" >Home</Nav.Link>
        <Nav.Link href="/Appointments">Appointments</Nav.Link>
        <Nav.Link href="/Availability">Availability</Nav.Link>
      </Nav>
        <Nav>
          <Nav.Link href="/">Log out</Nav.Link>
        </Nav>
    </Navbar>
  </header>
)

HeaderPat.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderPat.defaultProps = {
  siteTitle: ``,
}

export default HeaderPat
