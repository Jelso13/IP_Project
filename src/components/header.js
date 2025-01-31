import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import Cookies from "universal-cookie"
import { navigate } from "gatsby-link"
import iconMan from "../images/IconMan.png"

const Header = (props) => (
  <header
    style={{
      overflowX:"auto",
      overflowY:"auto",
      width: "100%"
    }}
  >
    <Navbar bg="dark" variant="dark" style={{minWidth:"600px"}}>
      <Nav className="mr-auto" expand={"lg"}>
          <div style = {{
              backgroundImage: "url("+iconMan+")",
              backgroundRepeat: "no-repeat",
              backgroundPosition:"center center",
              minWidth: "30px",
              backgroundSize: "150%",
              position:"relative",
          }}>
          </div>
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
