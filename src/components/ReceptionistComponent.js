import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { Button, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap"

const ReceptionistComponent = (props) => {
    if (props.currentTab === "home") {
        return (<HomeComp/>)
    } else if (props.currentTab === "callRequests") {
        return (<CallReqComp/>)
    } else if (props.currentTab === "appointmentSlots") {
        return (<AppointmentManagementComp/>)
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

const CallReqComp = () => {

    const [requests, setRequests] = useState([]);
    const [showSpinner, toggleSpinner] = useState(false)

    useEffect(() => {
        toggleSpinner(true)
        fetch(
          "https://europe-west2-sustained-node-257616.cloudfunctions.net/GetCallRequests",
          {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ "":""}),
          }
        )
          .then(function(response) {
              return response.json()
          })
          .then(function(data) {
              setRequests(data["data"]);
              console.log(data);
              toggleSpinner(false);
          })
    }, [])

    // change the values below dynamically using .map to dynamically create
    // the html for the values queried from the database
    // the values from the database are then obtained by manually searching
    // for the appointments in the database with the correct patient ID
    // value and are then added to the table.
    return (
      <div>
          <h1>Call Requests</h1>
          {showSpinner ? <SpinnerComp/> :
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.length > 0 ? (
                      requests.map((value, index) => {
                          return (
                            <TableRow
                              key={index}
                              username={value.username}
                              number={value.number}
                            />
                          )
                      })
                    ) : (
                      <TableRow username={""}/>
                    )}
                    </tbody>
                </Table>
                < Button > Remove Request</Button>
            </div>
          }
      </div>
    )
}

const TableRow = props => {
    console.log(props);
    if (props.username === "") {
        return (
          <tr>
              <td>No Requests</td>
              <td>.</td>
          </tr>
        )
    }
    return (
      <tr>
          <td>{props.username}</td>
          <td>{props.number}</td>
      </tr>
    )
}

const SpinnerComp = () => (
  <Container fluid>
      <Row>
          <Col style={{ textAlign: "center" }}>
              <Spinner animation={"border"} />
          </Col>
      </Row>
  </Container>
)

const AppointmentManagementComp = () => {

    return (
      <div>
          <h1>Appointment Management</h1>
          <Container fluid>
              <Row>
                  <Col>
                      <h>Cancellations</h>
                      <Table striped bordered hover size="sm">
                          <thead>
                          <tr>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Doctor</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td>4/3/2020</td>
                              <td>12:00</td>
                              <td>Dr Who</td>
                          </tr>
                          <tr>
                              <td>2/3/2020</td>
                              <td>3:30</td>
                              <td>Dr Seuss</td>
                          </tr>
                          <tr>
                              <td>1/3/2020</td>
                              <td>11:00</td>
                              <td>Dr Martens</td>
                          </tr>
                          </tbody>
                      </Table>
                  </Col>
                  <Col>
                      <h>Possible Alternative Patients</h>
                      <Table striped bordered hover size="sm">
                          <thead>
                          <tr>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Patient Name</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td>4/3/2020</td>
                              <td>12:00</td>
                              <td>Example user 1</td>
                          </tr>
                          <tr>
                              <td>4/3/2020</td>
                              <td>12:00</td>
                              <td>Example user 2</td>
                          </tr>
                          <tr>
                              <td>4/3/2020</td>
                              <td>12:00</td>
                              <td>Example user 3</td>
                          </tr>
                          </tbody>
                      </Table>
                  </Col></Row></Container>
          <Button>Commit Changes</Button>
          <p style={{marginTop:"50px"}}>// put a clinic selection button here in order to get the cancellations for specific clinics</p>
          <p> ** have it so that when a cancellation on the left is selected a possible time is presented for that slot</p>
          <p> // possibly have an undo action button but this can be done after</p>
      </div>
    )
}


export default ReceptionistComponent

ReceptionistComponent.defaultProps = {
    currentTab: "home",
}