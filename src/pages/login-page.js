import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const LoginPage = () => (
    <Layout>
        <SEO title="Login page" />
        <h1>This is the test login page</h1>
        <p>I don't actually do anything yet</p>
        <Link to="/">Go back to the homepage</Link>
    </Layout>
)

export default LoginPage