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

    const [show, setShow] = useState(false);
    const [reserved, setReserved] = useState(false); //TODO: update it according to the data type of incoming data, e.g. true/false if boolean, 0/1 if number
    const [time, setTime] = useState("few");

    //TODO:  for the following function to work please update setReserved within the try block
    // to whatever fields are coming in as the response, e.g. ".data" and then uncomment the code below

    // const getData = async () => {
    //     try {
    //         const fridge = await axios.get("http://localhost/echo_det_state.php")
    //         console.log(fridge.data)
    //         setReserved(fridge.data);  // set State

    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // };

    // useEffect(() => {
    //     getData()

    //     const interval = setInterval(() => {
    //         getData()
    //     }, 10000) //updating every 10 seconds


    //     return () => clearInterval(interval)
    // }, [])  // includes empty dependency array



    const handleClose = () => setShow(false);

    const handleReserve = () => {
        setReserved(true);
    }

    const handleRelease = () => {
        setReserved(false);
        setShow(false);
    }

    const handleShow = () => setShow(true);
    const title = reserved == true ? "System Unavailable" : "System Available";
    const color = reserved == true ? "warning" : "success";
    const subtext = reserved == true ? "System reserved for " : "Reserve system for: ";
    const reserve_btn = reserved == true ? "Release Control" : "Reserve Now";
    const clickHandler = reserved == true ? handleRelease : handleReserve;
    const time_hrs = reserved == true ? time + " hours" : 
    <FormControl
    placeholder="Hours"
    aria-label="Hours"
    aria-describedby="basic-addon2"
    onChange={e => setTime(e.target.value)}
    type="text"
    />;

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
            <Button variant="primary" onClick={clickHandler}>
                {reserve_btn}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default CalibrationStatusIndicator;
