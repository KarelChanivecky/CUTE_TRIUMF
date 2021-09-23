import React, {useState} from "react";
import {Box, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export default function FButtonDropField(props){

    //state variable for the desired motor
    const [motor, setMotor] = useState("");
    //event handler for drop down field
    function handleSelectChange(e){
        setMotor(e.target.value);
        console.log(e.target.value);
    }
    //state variable for the desired direction
    const [dir, setDir] = useState("");
    //event handler for drop down field
    function handleDirectionChange(e){
        setDir(e.target.value);
        console.log(e.target.value);
    }
    //state variable for the desired motor speed
    const [motorSpd, setMotorSpd] = useState("");
    //event handler for drop down field
    function handleFieldChange(e){
        var val = e.target.value;
        console.log(e.target.value);
        //if the value is a number
        if (!isNaN(val)){
            setMotorSpd(val);
        }
    }

    function sendValue(){
        if (motor<0){
            //if the all case for the motor was selected
            for (var i=0;i<=2;i++){
                //console.log("/avr0 m"+ i+" dir "+dir);
                //console.log("/avr0 m"+ i+" ramp "+motorSpd);
                //TODO: test functionality
                props.onclick("/avr0 m"+ i+" dir "+dir);
                props.onclick("/avr0 m"+ i+" ramp "+motorSpd);

            }

        }
        else {
            //console.log("/avr0 m"+ motor+" dir "+dir);
            //console.log("/avr0 m"+ motor+" ramp "+motorSpd);
            //TODO: test functionality
            props.onclick("/avr0 m"+ motor+" dir "+dir);
            props.onclick("/avr0 m"+ motor+" ramp "+motorSpd);

        }
    }

    return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
    <Grid item>
    <Box display="flex" spacing={2} flexDirection="row" color="primary" style={{alignItems:"center"}}>

         <TextField
            select
            label="Motor"
            id="motor-select"
            size="small"
            value={motor}
            onChange={handleSelectChange}
            style={{width:75}}
         >
          <MenuItem value={-1}>All</MenuItem>
          <MenuItem value={0}>A</MenuItem>
          <MenuItem value={1}>B</MenuItem>
          <MenuItem value={2}>C</MenuItem>
         </TextField>

         <TextField
            select
            label="Direction"
            id="direction-select"
            size="small"
            value={dir}
            onChange={handleDirectionChange}
            style={{width:100}}
         >
          <MenuItem value={0}>Up</MenuItem>
          <MenuItem value={1}>Down</MenuItem>
         </TextField>

        <TextField
            id="number-field"
            label="Speed"
            type="number"
            size="small"
            style={{width:75}}
            onChange={handleFieldChange}
            InputProps={{inputProps:{step:25, min:0, max:500}}}
        />
    </Box>
    </Grid>
    <Grid item>
    <Box>
        <Button onClick={sendValue} color="primary" variant="outlined">
            Drive
        </Button>

    </Box>
    </Grid>
    </Grid>
    );
}
