import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const IndexPage = () => {

    const testButtonFunction = () => {
        const testData = { d : 'example'};
        return 'Hello World';
        // fetch('https://us-central1-sustained-node-257616.cloudfunctions.net/TestFunction', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(testData),
        // });
    }
    return (<Layout>
        <SEO title="Home"/>
        <h1>Welcome</h1>
        <p>This is some test text for the index page</p>
        <div><Button onClick={testButtonFunction} variant="dark">Test Button</Button></div>

        <Link to="/page-2/">Go to page 2</Link>
    </Layout>);
}

export default IndexPage
