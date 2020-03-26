import React, {} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { navigate } from "gatsby-link"
import iconMan from "../images/IconMan.png"

const HeaderPat = (props) => {
 return ( <header
    style={{
      overflowX:"hidden",
      overflowY:"hidden",
        width:"100%",
        maxWidth: "100%"
    }}
  >
     <div style={{
         overflowX:"auto",
         overflowY:"auto",
         width:"100%",
         maxWidth: "100%"
     }}>
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
