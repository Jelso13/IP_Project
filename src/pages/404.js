import React, { useEffect } from "react"
import {navigate} from "gatsby"
import SEO from "../components/seo"

const NotFoundPage = () => {
    useEffect(() => {navigate("/")}, [])
    return (<></>)
}

export default NotFoundPage
