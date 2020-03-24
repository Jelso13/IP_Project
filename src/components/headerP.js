import React, {} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { navigate } from "gatsby-link"

const HeaderPat = (props) => {
 return ( <header
    style={{
      overflowX:"hidden",
      overflowY:"hidden",
        width:"100hv"
    }}
  >
     <div style={{
         overflowX:"auto",
         overflowY:"auto",
         width:"100hv"
     }}>
    <Navbar bg="dark" variant="dark" style={{minWidth:"420px"}}>
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
     </div>
  </header>)
}

HeaderPat.defaultProps = {
  changeTab: () => {console.warn("error no prop passed in headerP")}
}

export default HeaderPat
