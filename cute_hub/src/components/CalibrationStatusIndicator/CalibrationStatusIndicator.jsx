import React from 'react';
import {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {Modal} from 'react-bootstrap';
import { Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({

    color: {
        borderRadius: "5px",
        // backgroundColor: "lightgreen",
        margin: "0.5em",
        padding: "0.7em"
    }

}));


function CalibrationStatusIndicator(props) {

    const classes = useStyles();

    // return (
    //     <h6 className={classes.color}>System available</h6>
    // );

    const [show, setShow] = useState(false);
    const [reserved, setReserved] = useState(false);
    const [time, setTime] = useState("");

  const handleClose = () => setShow(false);
  const handleReserve = () => {
      setReserved(true);
    }
  const handleShow = () => setShow(true);
  const title = reserved ? "System Unavailable" : "System Available";
  const color = reserved ? "warning" : "success";
  const subtext = reserved ? "System reserved for: " : "Reserve system for: ";
  const time_hrs = reserved ? time + " Hours" : 
  <FormControl
  placeholder="Hours"
  aria-label="Hours"
  aria-describedby="basic-addon2"
  onChange={e => setTime(e.target.value)}
  type="text"
/>;
  const reserve_btn = reserved ? <></> : <Button variant="primary" onClick={handleReserve}>Reserve Now</Button>;

  return (
    <>
      <Button className={classes.color} variant={color} onClick={handleShow}>
        {title}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>System Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>{subtext} {time_hrs}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {reserve_btn}
        </Modal.Footer>
      </Modal>
    </>
  );
}


// function CalibrationStatusIndicator(props) {
//     const alertText = "System available";
//     const alertSeverity = "success";
//     return (
//         <Alert variant="filled" severity={alertSeverity}>{alertText}</Alert>
//     );
// }

export default CalibrationStatusIndicator;
