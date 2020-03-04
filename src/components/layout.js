/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import {Navbar, Nav, Button, FormControl, Form} from 'react-bootstrap';

import Header from "./header"
import "./layout.css"
import HeaderPat from "./headerP"
import BackgroundP from '../images/BackgroundPatient.png'
import BackgroundR from '../images/BackgroundReceptionist.png'
import Cookies from 'universal-cookie';

const Layout = ({ children, headerChoice, changeTab}) => {
    const cookies = new Cookies();
    const [headerChoiceState, updateHeaderChoice] = useState(headerChoice)

    useEffect(() => {
        if (cookies.get("username") == undefined) {
            navigate("/404");
            return (<></>);
        }
        if (cookies.get("uType") != headerChoice) {
            navigate("/404")
        }
        console.log(headerChoice)
        if (headerChoice == "patient") {
            const background = BackgroundP;
        } else if (headerChoice == "receptionist" || headerChoice == "admin") {
            const background = BackgroundR;
        } else {
            navigate("/");
            return (<></>);
        }
    }, []);
    return (
      <>

            {/*<Header siteTitle={data.site.siteMetadata.title}/>*/}
          <div
          style={{
              backgroundImage: headerChoiceState == "patient" ? "linear-gradient(#FFFFFF,#d1e3ff)" : "linear-gradient(#172850,#13062e)",
              // backgroundImage:"linear-gradient(to bottom, rgb(23, 45, 85) 0%, rgb(17, 6, 43) 99%, rgb(62, 104, 76) 100%)",
              height:"100vh",
              minHeight:"100%",
              display:"flex",
              flexDirection:"column",
              overflow:"hidden",
          }}>
              {headerChoice == "patient" ? <HeaderPat changeTab={changeTab}/> : <Header/>}
              <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `0 1.0875rem 1.45rem`,
                    position:"relative",
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                    flex:1,
                    width: "100%",
                    backgroundImage: "url("+BackgroundR+")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition:"center bottom",
                    overflow:"hidden",
                }}
              >
                  <main>{children}</main>
              </div>
          </div>
      </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
    headerChoice: "p",
    defaultBackground : "blue",
    changeTab: () => {console.log("Fuck up Layout")}
}

export default Layout
