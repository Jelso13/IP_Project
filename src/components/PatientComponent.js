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
    // height: calc(100% - x pixels)

    return (
      <div>
          {props.currentTab === "home" ? <HomeComp /> :
            props.currentTab === "appointments" ? <AppointmentComp /> :
            props.currentTab === "availability" ? <AvailabilityComp /> :
            <h1>Error</h1>}
      </div>
    )

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
    const cookies = new Cookies();
    const username = cookies.get("username");
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    const [myEvents, updateMyEvents] = useState([]);
    const [currentView, changeView] = useState("day")

    const [k, forceRerender] = useState(false);
    const now = new Date();
    const minDate = new Date();
    minDate.setDate(minDate.getDate()+3);
    const handleSelect = (event) => {
        const value = event.start;
        if (currentView !== "month" && currentView !== "week" && value >= now ) {
            console.log(event);
            let cpy = myEvents;
            cpy.push(event);
            updateMyEvents(cpy);
            forceRerender(!k)
        }
    }

    const DateCell = ({ value, children }) => {
        const pastStyle = {
            width: "14.3%",
        background: "#ccc",
        borderRight: "solid 1px #fff",
        }
        return (
          <div style={ value < now ? pastStyle  : {} }>
              { children }
          </div>
        )

    }

    const handlePop = () => {
        let cpy = myEvents;
        cpy.pop();
        updateMyEvents(cpy);
        forceRerender(!k)
    }

    const submitAvailability = () => {
        fetch("https://europe-west2-sustained-node-257616.cloudfunctions.net/wipeAvailability", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username":username}),
        }).then((response) => {
            console.log("here");
            return response.json()
        }).then((data) => {
            console.log(data);
            for (let i = 0; i < myEvents.length; i++) {
                console.log("type is " + toString(typeof myEvents[i].start.getMinutes()))
                console.log(toString(myEvents[i].start.getMinutes()).padEnd(2, "0"));
                let formatted_date = myEvents[i].start.getDate() + "/" + (myEvents[i].start.getMonth() + 1) + "/" + myEvents[i].start.getFullYear();
                let formatted_start = myEvents[i].start.getHours() + ":" + myEvents[i].start.getMinutes();
                let formatted_end = myEvents[i].end.getHours() + ":" + myEvents[i].end.getMinutes();

                const req = {
                    "username": username,
                    "timeStart": formatted_start,
                    "timeEnd": formatted_end,
                    "date": formatted_date
                }
                fetch("https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateAvailability", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(req),
                }).then((response) => {
                    return response.json()
                }).then((data) => {
                    console.log(data);
                })
            }
        }).catch((err) => {
            console.warn(err);
        })
    }

    return (
      <div>
          <h1>Availability</h1>
          <BigCalendar.Calendar
            events={myEvents}
            localizer={localizer}
            defaultView={"day"}
            views={['day', 'month', 'agenda']}
            style={{height: "500px", width: "95%"}}
            selectable={true}
            onView={(val) => {
                changeView(val)
            }}
            min={new Date('2017, 1, 7, 07:00')}
            max={new Date('2017, 1, 7, 19:00')}
            components={{
                dateCellWrapper: DateCell
            }}
            onSelectSlot={event => handleSelect(event)}
          />
          <Button onClick={e => handlePop()} style={{marginRight:"50px", marginTop:"20px"}} variant={"dark"}>Undo</Button>
          {<Button onClick={e => submitAvailability()} style={{marginRight:"50px", marginTop:"20px"}} variant={"dark"}>Submit Availability</Button>}
          <p style={{marginTop: 0, padding: 0}}>You can add availability for 3 days time. Drag over times in the day view to select a section of time</p>

      </div>
    );
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
  <Container fluid>
      <Row>
          <Col style={{textAlign: "center"}}>
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