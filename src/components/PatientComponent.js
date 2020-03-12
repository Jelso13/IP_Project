import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table, Button, Form, Spinner, Container, Row, Col } from "react-bootstrap"
import Cookies from "universal-cookie"
// import Calendar from "rc-calendar"
// import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import * as BigCalendar from "react-big-calendar";
import events from './events'
import * as dates from './dates'
import Popup from "reactjs-popup";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { navigate } from "gatsby-link"

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
    const [checkstate, updateCheck] = useState([]);
    const [doubleCheck, updateDoubleCheck] = useState(true);
    const [showSpinner, toggleSpinner] = useState(false);

    useEffect(() => {
        toggleSpinner(true);
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
            data["appointments"].sort(function(a,b){
                  var r1 = a.date.split('/').reverse().join('');
                  var r2 = b.date.split('/').reverse().join('');
                  var t1 = a.time.split(':').join('');
                  var t2 = b.time.split(':').join('');
                  return r1 > r2 ? 1 : r1 < r2 ? -1 : t1 > t2 ? 1 : 0;
              }
            );
            let checkboxes = [];
            for (let i = 0; i < data["appointments"].length; i++) {
                checkboxes.push(false);
            }
            toggleSpinner(false);
            updateCheck(checkboxes);
            updateAppointments(data["appointments"]);
        });
    }, []);

    const cancelHandler = () => {
        for(let i = 0; i<checkstate.length; i++){
            if (checkstate[i]){
                // put in warning making sure they want to remove
                // if still yes then push the request to the database.
                // put tag in html { doubleCheck ? <warning/> : <></> }
                // write the function that makes the pop up box that has either yes or no
                fetch("https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateRequest", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(appointments[i]),
                }).then(function(response) {
                    return response.json()
                }).then(function(data) {
                    console.log(data);
                })
                //console.log(appointments[i]);
            }
        }
        updateDoubleCheck(false);
    }

    // change the values below dynamically using .map to dynamically create
    // the html for the values queried from the database
    // the values from the database are then obtained by manually searching
    // for the appointments in the database with the correct patient ID
    // value and are then added to the table.
    return (
      <div>
          <h1>Appointment</h1>
         {showSpinner ? <SpinnerComp /> : (<Table striped bordered hover size="sm">
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
                      return (<TableRow key={index}
                                        checkIndex={index}
                                        date={value.date}
                                        time={value.time}
                                        doctor={value.doctor}
                                        clinic={value.clinic}
                                        checkboxes={checkstate}
                                        updateCheck={updateCheck}
                      />)
                      }) : <TableRow date={""}/>}
              </tbody>
          </Table>)}
          <Popup modal trigger={<Button variant="dark" style={{ margin: "10px" }}>Request Cancellation</Button>} position="left center">
              {doubleCheck ?
              <div style={{backgroundColor:"#818cf7"}}>
              <h1 style={{textAlign:"center"}}>Are you sure you want to make these changes?</h1>
              <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"}}>
              <Button variant={"dark"} onClick={() => cancelHandler()} style={{margin:"50px"}}>Accept</Button>
              </div>
              </div>
                : <div style={{margin:"50px"}}><p>Request completed! :)</p></div>}
          </Popup>
          <Button variant="dark" style={{ marginLeft: "10px" }}>Request Call</Button>

      </div>
    )
}

const AvailabilityComp = () => {
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    const [myEvents, updateMyEvents] = useState([]);
    const [currentView, changeView] = useState("day")

    const [k, forceRerender] = useState(false);

    const handleSelect = (event) => {
        console.log(currentView)
        if (currentView !== "month" && currentView !== "week") {
            console.log(event);
            let cpy = myEvents;
            cpy.push(event);
            updateMyEvents(cpy);
            forceRerender(!k)
        }
    }

    const handlePop = () => {
        let cpy = myEvents;
        cpy.pop();
        updateMyEvents(cpy);
        forceRerender(!k)
    }

    // const submitAvailability = () => {
    //     fetch("https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateRequest", {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(appointments[i]),
    //     }).then(function(response) {
    //         return response.json()
    //     }).then(function(data) {
    //         console.log(data);
    //     })
    // }

    return (
      <div>
          <h1>Availability</h1>
          <BigCalendar.Calendar
            events={myEvents}
            localizer={localizer}
            defaultView={"day"}
            views={['day', 'week', 'month']}
            style={{height: "500px", width: "95%"}}
            selectable={true}
            onView={(val) => {
                changeView(val)
            }}
            onSelectSlot={event => handleSelect(event)}
          />
          <Button onClick={handlePop} style={{margin:"50px"}} variant={"dark"}>Undo</Button>
          {/*<Button onClick={submitAvailability} style={{margin:"50px"}} variant={"dark"}>Submit Availability</Button>*/}
      </div>
    )
}

// pass the checkbox handler through as a prop
const TableRow = (props) => {
    if(props.date === ""){
        return (<tr>
            <td>No Appointments</td>
            <td>.</td>
            <td>.</td>
            <td>.</td>
            <td>.</td>
        </tr>)
    }
    const checkHandler = (index) => {
        let cpy = props.checkboxes;
        cpy[index] = !cpy[index]
        props.updateCheck(cpy)
    }

    return (<tr>
        <td>{props.date}</td>
        <td>{props.time}</td>
        <td>{props.doctor}</td>
        <td>{props.clinic}</td>
        <td><Form.Check onChange={e => checkHandler(props.checkIndex)}/></td>
    </tr>)
}

const SpinnerComp = () => (
  <Container fluidi>
      <Row>
          <Col style={{textAlign: "centers"}}>
            <Spinner animation={"border"} />
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
    updateCheck: () => {console.log("wrong")},
    updateDoubleCheck: () => {console.log("false")},
}