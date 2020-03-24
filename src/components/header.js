import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import Cookies from "universal-cookie"
import { navigate } from "gatsby-link"

const Header = (props) => (
  <header
    style={{
      overflowX:"scroll",
      overflowY:"scroll",
      width: "100%"
    }}
  >
    <Navbar bg="dark" variant="dark" style={{minWidth:"420px"}}>
      <Nav className="mr-auto" expand={"lg"}>
        <Nav.Link onClick={() => props.changeTab("home")}>Home</Nav.Link>
        <Nav.Link onClick={() => props.changeTab("appointmentSlots")}>Appointment Management</Nav.Link>
        <Nav.Link onClick={() => props.changeTab("callRequests")}>Call Requests</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link onClick={() => {
          const cookies = new Cookies();
          cookies.remove("username", {path: "/"});
          cookies.remove("uType", {path:"/"});
          navigate("/404");
        }}>Log out
        </Nav.Link>
      </Nav>
    </Navbar>
  </header>
)

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
