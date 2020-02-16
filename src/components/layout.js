/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import HeaderPat from "./headerP"

const Layout = ({ children, headerChoice }) => {

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
    return (
      <>
          {headerChoice == "patient" ? <HeaderPat/> : <Header siteTitle={data.site.siteMetadata.title}/>}
          {/*<Header siteTitle={data.site.siteMetadata.title}/>*/}
          <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0 1.0875rem 1.45rem`,
            }}
          >
              <main>{children}</main>
          </div>
      </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
    headerChoice: "p",
}

export default Layout
