import React, {} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { navigate } from "gatsby-link"

const HeaderPat = (props) => {
 return ( <header
    style={{
      overflowX:"scroll",
      overflowY:"scroll",
      width: "100%"
    }}
  >
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto" expand={"lg"}>
        <Nav.Link onClick={() => props.changeTab("home")}>Home</Nav.Link>
        <Nav.Link onClick={() => props.changeTab("appointments")}>Appointments</Nav.Link>
        <Nav.Link onClick={() => props.changeTab("availability")}>Availability</Nav.Link>
        <Nav.Link onClick={() => props.changeTab("reqCall")}>Request Call</Nav.Link>
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
  </header>)
}

HeaderPat.defaultProps = {
  changeTab: () => {console.warn("error no prop passed in headerP")}
}

export default HeaderPat
