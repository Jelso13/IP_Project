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

    const [requests, setRequests] = useState([])
    const [showSpinner, toggleSpinner] = useState(false)
    const [checkstate, updateCheck] = useState([])

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
              body: JSON.stringify({ "": "" }),
          },
        )
          .then(function(response) {
              return response.json()
          })
          .then(function(data) {
              setRequests(data["data"])
              console.log(data)

              console.log("this is the requests" + requests)

              let checkboxes = []
              for (let i = 0; i < data.length; i++) {
                  checkboxes.push(false)
              }
              toggleSpinner(false)
              updateCheck(checkboxes)
          })
    }, [])

    const cancelHandler = () => {
        console.log("in cancelhandler")
        for (let i = 0; i < checkstate.length; i++) {

            if (checkstate[i]) {
                console.log(requests[i])
                console.log("found checked request")
                // put in warning making sure they want to remove
                // if still yes then push the request to the database.
                // put tag in html { doubleCheck ? <warning/> : <></> }
                // write the function that makes the pop up box that has either yes or no
                fetch(
                  "https://europe-west2-sustained-node-257616.cloudfunctions.net/DeleteRequest",
                  {
                      method: "POST",
                      mode: "cors",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(requests[i]),
                  },
                )
                  .then(function(response) {
                      return response.json()
                  })
                  .then(function(data) {
                      console.log(data)
                      const r = []
                      for (let j = 0; j < requests.length; j++) {
                          if (j != i) {
                              r.push(requests[j])
                          }
                      }
                      setRequests(r)

                  })
                //console.log(appointments[i]);
            }
        }
    }

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
                              checkIndex={index}
                              username={value.username}
                              number={value.number}
                              checkboxes={checkstate}
                              updateCheck={updateCheck}
                            />
                          )
                      })
                    ) : (
                      <TableRow username={""}/>
                    )}
                    </tbody>
                </Table>
                < Button onClick={() =>
                  cancelHandler()
                }> Remove Request</Button>
            </div>
          }
      </div>
    )
}


const TableRow = props => {
    console.log(props)
    if (props.username === "") {
        console.log("hit")
        return (
          <tr>
              <td>No Requests</td>
              <td>.</td>
          </tr>
        )
    }

    const checkHandler = index => {
        let cpy = props.checkboxes
        cpy[index] = !cpy[index]
        props.updateCheck(cpy)
    }

    return (
      <tr>
          <td>{props.username}</td>
          <td>{props.number}</td>
          <td>
              <Form.Check onChange={e => checkHandler(props.checkIndex)}/>
          </td>
      </tr>
    )
}

const SpinnerComp = () => (
  <Container fluid>
      <Row>
          <Col style={{ textAlign: "center" }}>
              <Spinner animation={"border"}/>
          </Col>
      </Row>
  </Container>
)

const AppointmentManagementComp = () => {

    const [requests, setRequests] = useState([])
    const [showSpinner, toggleSpinner] = useState(false)
    const [checkstate, updateCheck] = useState([])
    const [radioState, changeRadio] = useState({})

    useEffect(() => {
        toggleSpinner(true)
        fetch(
          "https://europe-west2-sustained-node-257616.cloudfunctions.net/GetCancellationRequests",
          {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ "": "" }),
          },
        )
          .then(function(response) {
              return response.json()
          })
          .then(function(data) {
              setRequests(data["data"])

              toggleSpinner(false)
          })

    }, [])

    useEffect(() => {
          if (radioState.length > 0) {
              toggleSpinner(true)
              fetch(
                "https://europe-west2-sustained-node-257616.cloudfunctions.net/GetAvailableForCancellation",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: radioState,
                },
              )
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    console.log(data)
                    toggleSpinner(false)
                }).catch((err) => {
                  console.log(err);
              })
              console.log(radioState)
          }
      }
      , [radioState])

    const changeHandler = () => {
        console.log(radioState);
    }

    const handleOptionChange = (changeEvent) => {
        changeRadio(changeEvent.target.value);
    };


    return (
      <div>
          {showSpinner ? <SpinnerComp/> :
            <div>
                <h1>Appointment Management</h1>
                <Container fluid>
                    <Row>
                        <Col>
                            <h5 style={{ margin: "5px" }}>Cancellations</h5>
                            <Table striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Doctor</th>
                                </tr>
                                </thead>
                                <tbody>
                                {requests.length > 0 ? (
                                  requests.map((value, index) => {
                                      return (
                                        <CancelTableRow
                                          key={index}
                                          checkIndex={index}
                                          username={value.username}
                                          date={value.date}
                                          time={value.time}
                                          doctor={value.doctor}
                                          handleChange={handleOptionChange}
                                          radState={radioState}
                                        />
                                      )
                                  })
                                ) : (
                                  <CancelTableRow username={""}/>
                                )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <h5 style={{ margin: "5px" }}>Possible Alternative Patients</h5>
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
                <Button onClick={() => changeHandler()}>Commit Changes</Button>
            </div>}
      </div>
    )
}

const CancelTableRow = props => {
    if (props.username === "") {
        return (
          <tr>
              <td>No Requests</td>
              <td>.</td>
              <td>.</td>
              <td>.</td>
          </tr>
        )
    }

    return (
      <tr>
          <td>{props.username}</td>
          <td>{props.date}</td>
          <td>{props.time}</td>
          <td>{props.doctor}</td>
          <td><div className="form-check">
              <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value={JSON.stringify({"date":props.date, "time":props.time, "doctor": props.doctor})}
                    checked={props.radState === JSON.stringify({"date":props.date, "time":props.time, "doctor": props.doctor})}
                    className="form-check-input"
                    onChange={props.handleChange}
                  />
              </label>
          </div></td>
      </tr>
    )
}


export default ReceptionistComponent

ReceptionistComponent.defaultProps = {
    currentTab: "home",
}