import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {
    Table,
    Button,
    Form,
    Spinner,
    Container,
    Row,
    Col,
    InputGroup,
    FormControl,
} from "react-bootstrap"
import Cookies from "universal-cookie"
// import Calendar from "rc-calendar"
// import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import * as BigCalendar from "react-big-calendar"
import events from "./events"
import * as dates from "./dates"
import Popup from "reactjs-popup"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import icon from "../images/Icon.png"
import Layout from "./layout"

const PatientComponent = props => {
    // height: calc(100% - x pixels)
    if (props.currentTab === "home") {
        return (<HomeComp/>)
    } else if (props.currentTab === "appointments") {
        return (<AppointmentComp/>)
    } else if (props.currentTab === "availability") {
        return (<AvailabilityComp/>)
    } else if (props.currentTab === "reqCall") {
        return (<ReqCallComp/>)
    }
}

const HomeComp = () => {
    const cookies = new Cookies()
    const username = cookies.get("username")
    const userType = cookies.get("uType")
    const [showSpinner, toggleSpinner] = useState(false)
    const [nextA, setA] = useState(false)
    const [notifications, setNot] = useState([])

    useEffect(() => {
        fetch(
          "https://europe-west2-sustained-node-257616.cloudfunctions.net/GetNextAppointment",
          {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: username }),
          },
        )
          .then(function(response) {
              return response.json()
          })
          .then(function(data) {
              setA(data["appointment"])
          })
    }, [])

    useEffect(() => {
        toggleSpinner(true)
        fetch(
          "https://europe-west2-sustained-node-257616.cloudfunctions.net/GetNotifications",
          {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: username }),
          },
        )
          .then(function(response) {
              return response.json()
          })
          .then(function(data) {
              let not = []
              for (let i = 0; i < data["data"].length; i++) {
                  not.push(data["data"][i]["message"])
              }
              toggleSpinner(false)
              setNot(not)
          })
    }, [])

    return (
      <div style={{
          maxHeight: "100%",
          height: "100%",
      }}>
          <div style={{
              backgroundImage: "url(" + icon + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center top",
              height: "100%",
              maxHeight: "50%",
          }}>
          </div>
          <h1 style={{
              marginTop: "0px",
              marginBottom: "10px",
              maxHeight: "10%",
              height: "100%",
          }}>Home</h1>
          <div style={{
              height: "100%",
              maxHeight: "40%",
              overflowY: "auto",
          }}>
              <p style={{ margin: 0 }}>{"Welcome " + username}</p>
              {nextA === false ? <></> : <p style={{ marginTop: 0, fontFamily: "Lucida Console, Courier, monospace"  }}>{"> Your next appointment is on " + nextA.date + " at " + nextA.time + " with " + nextA.doctor +"."}</p>}
              {showSpinner ? (
                <SpinnerComp/>
              ) : (
                notifications.length > 0 ? (
                  notifications.map((value, index) => {
                      return (
                        <p key={index}>{value}</p>
                      )
                  })
                ) : (
                  <></>
                ))}
          </div>
      </div>
    )
}

const AppointmentComp = () => {
    const cookies = new Cookies()
    const username = cookies.get("username")
    const [appointments, updateAppointments] = useState([])
    const [checkstate, updateCheck] = useState([])
    const [doubleCheck, updateDoubleCheck] = useState(true)
    const [showSpinner, toggleSpinner] = useState(false)

    useEffect(() => {
        toggleSpinner(true)
        fetch(
          "https://europe-west2-sustained-node-257616.cloudfunctions.net/GetAppointments",
          {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: username }),
          },
        )
          .then(function(response) {
              return response.json()
          })
          .then(function(data) {
              data["appointments"].sort(function(a, b) {
                  var r1 = a.date
                    .split("/")
                    .reverse()
                    .join("")
                  var r2 = b.date
                    .split("/")
                    .reverse()
                    .join("")
                  var t1 = a.time.split(":").join("")
                  var t2 = b.time.split(":").join("")
                  return r1 > r2 ? 1 : r1 < r2 ? -1 : t1 > t2 ? 1 : 0
              })
              let checkboxes = []
              for (let i = 0; i < data["appointments"].length; i++) {
                  checkboxes.push(false)
              }
              toggleSpinner(false)
              updateCheck(checkboxes)
              updateAppointments(data["appointments"])
          })
    }, [])

    const cancelHandler = () => {
        for (let i = 0; i < checkstate.length; i++) {
            if (checkstate[i]) {
                // put in warning making sure they want to remove
                // if still yes then push the request to the database.
                // put tag in html { doubleCheck ? <warning/> : <></> }
                // write the function that makes the pop up box that has either yes or no
                fetch(
                  "https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateCancelRequest",
                  {
                      method: "POST",
                      mode: "cors",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(appointments[i]),
                  },
                )
                  .then(function(response) {
                      return response.json()
                  })
                  .then(function(data) {
                      console.log(data)
                  })
                //console.log(appointments[i]);
            }
        }
        updateDoubleCheck(false)
    }

    // change the values below dynamically using .map to dynamically create
    // the html for the values queried from the database
    // the values from the database are then obtained by manually searching
    // for the appointments in the database with the correct patient ID
    // value and are then added to the table.
    return (
      <div style={{
          height: "100%",
          maxHeight: "100%",
          overflowY: "auto",
      }}>
          <div style={{
              height: "100%",
              maxHeight: "85%",
              overflowY: "hidden",
          }}>
              <h1>Appointments</h1>
              {showSpinner ? (
                <SpinnerComp/>
              ) : (
                <div style={{
                    maxHeight: "70%",
                    overflowY: "auto",
                    display: "block",
                }}>
                    <Table striped bordered hover size="sm" style={{
                        height: "50%",
                    }}>
                        <thead>
                        <tr style={{ backgroundColor: "#4f96e8" }}>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Clinic</th>
                            <th>Select</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.length > 0 ? (
                          appointments.map((value, index) => {
                              return (
                                <TableRow
                                  key={index}
                                  checkIndex={index}
                                  date={value.date}
                                  time={value.time}
                                  doctor={value.doctor}
                                  clinic={value.clinic}
                                  checkboxes={checkstate}
                                  updateCheck={updateCheck}
                                />
                              )
                          })
                        ) : (
                          <TableRow date={""}/>
                        )}
                        </tbody>
                    </Table>
                </div>
              )}
          </div>
          <div style={{ margin: "5px", height: "100%", maxHeight: "10%" }}>
              <Popup
                modal
                trigger={
                    <Button variant="dark">
                        Request Cancellation
                    </Button>
                }
                position="left center"
              >
                  {doubleCheck ? (
                    <div style={{ backgroundColor: "#818cf7" }}>
                        <h1 style={{ textAlign: "center" }}>
                            Are you sure you want to make these changes?
                        </h1>
                        <div
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                        >
                            <Button
                              variant={"dark"}
                              onClick={() => cancelHandler()}
                              style={{ margin: "50px" }}
                            >
                                Accept
                            </Button>
                        </div>
                    </div>
                  ) : (
                    <div style={{ margin: "50px" }}>
                        <p>Request completed! :)</p>
                    </div>
                  )}
              </Popup>
          </div>
      </div>
    )
}

const AvailabilityComp = () => {
    const cookies = new Cookies()
    const username = cookies.get("username")
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    const [myEvents, updateMyEvents] = useState([])
    const [currentView, changeView] = useState("day")
    const [submitted, hasSubmitted] = useState(false)

    const [k, forceRerender] = useState(false)
    const now = new Date()
    now.setDate(now.getDate() + 3)
    now.setHours(0)
    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 3)
    minDate.setHours(0)
    const handleSelect = event => {
        const value = event.start
        if (currentView !== "month" && currentView !== "week" && value >= now) {
            console.log(event)
            let cpy = myEvents
            cpy.push(event)
            updateMyEvents(cpy)
            forceRerender(!k)
        }
    }

    const DateCell = ({ value, children }) => {
        const pastStyle = {
            width: "14.3%",
            background: "#ccc",
            borderRight: "solid 1px #fff",
        }
        return <div style={value < now ? pastStyle : {}}>{children}</div>
    }

    const handlePop = () => {
        let cpy = myEvents
        cpy.pop()
        updateMyEvents(cpy)
        forceRerender(!k)
    }

    const submitAvailability = () => {
        fetch(
          "https://europe-west2-sustained-node-257616.cloudfunctions.net/wipeAvailability",
          {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: username }),
          },
        )
          .then(response => {
              console.log("here")
              return response.json()
          })
          .then(data => {
              console.log(data)
              console.log("myEvents.length = " + myEvents.length)
              for (let i = 0; i < myEvents.length; i++) {
                  let formatted_date =
                    ("00" + myEvents[i].start.getDate()).slice(-2) +
                    "/" +
                    ("00" + (myEvents[i].start.getMonth() + 1)).slice(-2) +
                    "/" +
                    myEvents[i].start.getFullYear()
                  let formatted_start =
                    myEvents[i].start.getHours() + ":" + myEvents[i].start.getMinutes()
                  let formatted_end =
                    myEvents[i].end.getHours() + ":" + myEvents[i].end.getMinutes()

                  const req = {
                      username: username,
                      timeStart: formatted_start,
                      timeEnd: formatted_end,
                      date: formatted_date,
                  }
                  fetch(
                    "https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateAvailability",
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(req),
                    },
                  )
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        console.log(data)
                        hasSubmitted(true)
                    })
              }
          })
          .catch(err => {
              console.warn(err)
          })
    }

    return (
      <div style={{
          height: "100%",
          maxHeight: "100%",
          overflowY: "hidden",
      }}>
          <h1 style={{
              maxHeight: "10%",
              height: "100%",
          }}>Availability</h1>
          <div style={{
              overflowY: "auto",
              height: "100%",
              maxHeight: "60%",
          }}>
              <BigCalendar.Calendar
                resizableAccessor={() => false}
                events={myEvents}
                localizer={localizer}
                defaultView={"day"}
                views={["day", "month", "agenda"]}
                style={{ height: "100%", width: "95%" }}
                selectable={true}
                onView={val => {
                    changeView(val)
                }}
                defaultDate={now}
                min={new Date("2017, 1, 7, 07:00")}
                max={new Date("2017, 1, 7, 19:00")}
                components={{
                    dateCellWrapper: DateCell,
                }}
                onSelectSlot={event => handleSelect(event)}
              />
          </div>
          <div style={{
              height: "30%",
              maxHeight: "30%",
              overflowY: "auto",
          }}>
              <Button
                onClick={e => handlePop()}
                style={{ marginRight: "50px", marginTop: "20px" }}
                variant={"dark"}
              >
                  Undo
              </Button>
              {
                  <Button
                    onClick={e => submitAvailability()}
                    style={{ marginRight: "50px", marginTop: "20px" }}
                    variant={"dark"}
                  >
                      Submit Availability
                  </Button>
              }
              {submitted ? <p>Submission sent</p> :
                <p style={{ marginTop: 0, padding: 0, marginBottom: 0 }}>
                    Drag over times in the day to view to select a section of time
                </p>
              }
          </div>
      </div>
    )
}

// pass the checkbox handler through as a prop
const TableRow = props => {
    if (props.date === "") {
        return (
          <tr style={{ backgroundColor: "white" }}>
              <td>No Appointments</td>
              <td>.</td>
              <td>.</td>
              <td>.</td>
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
      <tr style={{ backgroundColor: "white" }}>
          <td>{props.date}</td>
          <td>{props.time}</td>
          <td>{props.doctor}</td>
          <td>{props.clinic}</td>
          <td>
              <Form.Check onChange={e => checkHandler(props.checkIndex)}/>
          </td>
      </tr>
    )
}

const ReqCallComp = () => {
    const cookies = new Cookies()
    const username = cookies.get("username")
    const password = cookies.get("password")
    const [verification, updateVerification] = useState(false)
    const [phoneNumber, updatePhoneNumber] = useState("")
    const [pword, updatePWord] = useState("")
    const [error, setError] = useState("n")
    const [sent, hasSent] = useState(false)

    const handleButton = () => {
        console.log(phoneNumber)
        var isnum = /^\d+$/.test(phoneNumber)
        if (isnum && phoneNumber.length > 7) {
            updateVerification(true)
        } else {
            updateVerification(false)
        }
    }

    const handlePwordSubmit = event => {
        event.preventDefault()
        if (pword) {
            const userData = { username: username, password: pword }
            fetch(
              "https://europe-west1-sustained-node-257616.cloudfunctions.net/checkLogin",
              {
                  method: "POST",
                  mode: "cors",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userData),
              },
            )
              .then(function(response) {
                  return response.json()
              })
              .then(function(data) {
                  if (data.m === "exists") {
                      console.log("password is correct")
                      let rJson = {
                          username: username,
                          number: phoneNumber,
                      }
                      fetch(
                        "https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateCallRequest",
                        {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(rJson),
                        },
                      )
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(data) {
                            if (data.m === "Request Created") {
                                console.log("request sent")
                                hasSent(true)
                                setError("")
                            } else {
                                console.log("password = " + pword)
                                console.log("usernamer = " + username)
                                console.log(data)
                            }
                        })
                  } else {
                      console.log("password is wrong")
                      setError("w")
                  }
              })
        } else {
            setError("n")
        }
    }

    return (
      <div>
          {sent ? (<p>Request Sent</p>) :
            (<div>
                  <h1>Request Call</h1>
                  <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        aria-describedby="basic-addon2"
                        onChange={event => updatePhoneNumber(event.target.value)}
                      />
                      <InputGroup.Append>
                          <Button
                            onClick={() => handleButton()}
                            variant="outline-secondary"
                          >
                              Send Request
                          </Button>
                      </InputGroup.Append>
                  </InputGroup>
                  {verification ? (
                    <div>
                        <p>Please enter your password to submit call request</p>
                        <InputGroup className="mb-3">
                            <FormControl
                              placeholder="Password"
                              aria-label="Password"
                              aria-describedby="basic-addon2"
                              onChange={event => updatePWord(event.target.value)}
                              type={"password"}
                            />
                            <InputGroup.Append>
                                <Button
                                  onClick={event => handlePwordSubmit(event)}
                                  type={"submit"}
                                  variant="outline-secondary"
                                >
                                    Submit
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {error === "n" ? (<p></p>) :
                          error === "w" ? (<p>Password is not correct</p>) :
                            (<p>Request Submitted</p>)}
                    </div>
                  ) : (
                    <p>please enter a phone number</p>
                  )}
              </div>
            )}
      </div>
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

export default PatientComponent

PatientComponent.defaultProps = {
    currentTab: "home",
}

TableRow.defaultProps = {
    date: "",
    time: "",
    doctor: "",
    clinic: "",
    checkboxes: [],
    updateCheck: () => {
        console.log("wrong")
    },
    updateDoubleCheck: () => {
        console.log("false")
    },
}
