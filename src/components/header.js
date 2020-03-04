import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import Cookies from "universal-cookie"

const Header = () => (
  <header
    style={{
    }}
  >
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/CallRequests">Call Requests</Nav.Link>
        <Nav.Link href="/AppointmentSlots">Appointment Slots</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/" onClick={() => {
          var cookies = new Cookies();
          cookies.remove("username");
          cookies.remove("uType");
        }
        }>Log out</Nav.Link>
      </Nav>
    </Navbar>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
