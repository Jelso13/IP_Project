/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {Navbar, Nav, Button, FormControl, Form} from 'react-bootstrap';

import Header from "./header"
import "./layout.css"
import HeaderPat from "./headerP"
import BackgroundP from '../images/BackgroundPatient.png'
import BackgroundR from '../images/BackgroundReceptionist.png'

const Layout = ({ children, headerChoice }) => {
    const defaultBackground = "blue";
    console.log(headerChoice)
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
    console.log(headerChoice)
    if (headerChoice == "patient"){
        const background = BackgroundP;
    }
    else{
        const background = BackgroundR;
    }
    return (
      <>

            {/*<Header siteTitle={data.site.siteMetadata.title}/>*/}
          <div
          style={{
              backgroundImage: headerChoice == "patient" ? "linear-gradient(#FFFFFF,#d1e3ff)" : "linear-gradient(#172850,#13062e)",
              // backgroundImage:"linear-gradient(to bottom, rgb(23, 45, 85) 0%, rgb(17, 6, 43) 99%, rgb(62, 104, 76) 100%)",
              height:"100vh",
              minHeight:"100%",
              display:"flex",
              flexDirection:"column",
          }}>
              {headerChoice == "patient" ? <HeaderPat/> : <Header siteTitle={data.site.siteMetadata.title}/>}
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
}

export default Layout
