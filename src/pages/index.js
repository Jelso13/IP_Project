import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome</h1>
    <p>This is some test text for the index page</p>

    <Link to="/page-2/">Go to page 2</Link>
      
    <h2>Login page</h2>
    <Link to="/login-page/">Go to Login page</Link>
  </Layout>
)

export default IndexPage
