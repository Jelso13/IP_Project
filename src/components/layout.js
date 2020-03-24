import React, {useEffect} from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import Header from "./header"
import "./layout.css"
import HeaderPat from "./headerP"
import BackgroundR from '../images/BackgroundReceptionist.png'
import Cookies from 'universal-cookie';

const Layout = ({ children, headerChoice, changeTab}) => {

    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get("username") === undefined) {
            navigate("/404");
            return (<></>);
        }
        if (cookies.get("uType") !== headerChoice) {
            navigate("/404")
        }
    }, [headerChoice]);
    return (
      <>
            {/*<Header siteTitle={data.site.siteMetadata.title}/>*/}
          <div
          style={{
              backgroundImage: headerChoice === "patient" ? "linear-gradient(#FFFFFF,#818cf7)" : "linear-gradient(#ffffff,#f1cfff)",
              height:"100vh",
              display:"flex",
              flexDirection:"column",
              overflow:"hidden",
          }}>
              {headerChoice === "patient" ? <HeaderPat changeTab={changeTab}/> : <Header changeTab={changeTab}/>}
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
              }}>
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
                    overflow:"auto",
                    maxHeight: "90%"
                }}
              >
                  <main>{children}</main>
              </div>
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
    changeTab: () => {console.warn("error no prop passed on layout")}
}

export default Layout
