import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table, Button, Form } from "react-bootstrap"
import Cookies from "universal-cookie"
import Calendar from "rc-calendar"

const PatientComponent = (props) => {
    if (props.currentTab === "home") {
        return (<HomeComp/>)
    } else if (props.currentTab === "appointments") {
        return (<AppointmentComp/>)
    } else if (props.currentTab === "availability") {
        return (<AvailabilityComp/>)
    } else {
        return (<h1>Error</h1>)
    }
}

const HomeComp = () => {
    const cookies = new Cookies()
    const username = cookies.get("username")
    const userType = cookies.get("uType")
    return (<div>
          <h1>Home</h1>
          <p style={{ margin: 0 }}>{"Welcome " + username}</p>
          <p>{"You have now logged in as " + userType}</p>
      </div>
    )
}

const AppointmentComp = () => {
    const cookies = new Cookies();
    const username = cookies.get("username");
    const [appointments, updateAppointments] = useState([]);
    //const [checkstate, updateCheck] = useState([]);
    const checkboxes = [];
    useEffect(() => {
        fetch("https://europe-west2-sustained-node-257616.cloudfunctions.net/GetAppointments", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username": username}),
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            updateAppointments(data["appointments"]);
            console.log(data)
        });
    }, []);

    appointments.sort(function(a,b){
        var r1 = a.date.split('/').reverse().join('');
        var r2 = b.date.split('/').reverse().join('');
        console.log(r1)
        console.log(r2)
        console.log("##")
        return r1 > r2 ? 1 : r1 < r2 ? -1 : 0;
      }

    );

    // change the values below dynamically using .map to dynamically create
    // the html for the values queried from the database
    // the values from the database are then obtained by manually searching
    // for the appointments in the database with the correct patient ID
    // value and are then added to the table.
    return (
      <div>
          <h1>Appointment</h1>
          <Table striped bordered hover size="sm">
              <thead>
              <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Clinic</th>
                  <th>Select</th>
              </tr>
              </thead>
              <tbody>
                  {appointments.length > 0 ?
                      appointments.map((value,index) => {
                      //checkboxes.push(false);
                      return (<TableRow key={index} date={value.date} time={value.time} doctor={value.doctor} clinic={value.clinic}/>)
                  }) : <p> No Appointments</p>}
              </tbody>
          </Table>
          <Button variant="dark" style={{ margin: "10px" }}>Request Cancellation</Button>
          <Button variant="dark" style={{ marginLeft: "10px" }}>Request Call</Button>
      </div>
    )
}

const AvailabilityComp = () => {

    return (
      <div>
          <h1>Availability</h1>
          <Calendar></Calendar>
      </div>
    )
}

const TableRow = (props) => (
  <tr>
      <td>{props.date}</td>
      <td>{props.time}</td>
      <td>{props.doctor}</td>
      <td>{props.clinic}</td>
      <td><Form.Check></Form.Check></td>
  </tr>
)

export default PatientComponent

PatientComponent.defaultProps = {
    currentTab: "home",
}

TableRow.defaultProps = {
    date: "",
    time: "",
    doctor: "",
    clinic: "",
}