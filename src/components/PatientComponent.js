import React, { useState } from "react"

const PatientComponent = (props) => {
    if (props.currentTab === "home") {
        return (<HomeComp />)
    } else if (props.currentTab === "appointments") {
        return (<AppointmentComp/>)
    } else if (props.currentTab === "availability") {
        return (<AvailabilityComp/>)
    } else {
        return (<h1>Error</h1>)
    }

    // return(<div>{props.currentTab === "home" ? <HomeComp /> : (props.currentTab === "appointments" ? <AppointmentComp /> : <AvailabilityComp/>)}</div>)
}

const HomeComp = () => {

    return(
      <h1>Home</h1>
    )
}

const AppointmentComp = () => {

    return(
      <h1>Appointment</h1>
    )
}

const AvailabilityComp = () => {

    return(
      <h1>Availability</h1>
    )
}


export default PatientComponent

PatientComponent.defaultProps = {
    currentTab: "home"
}