import React, {useState} from "react";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function FButtonField(props){
    //state variable for the desired position
    const [value, setValue] = useState(1);

    //handler for when the input number changes
    function handleFieldChange(e){
        var val = e.target.value;
        //if the value is a number
        if (!isNaN(val)){
            setValue(val);
            console.log(val);
        }
    }
    function sendValue(){
        //console.log("updating control position to:", value);
        props.onclick(props.command+":"+value);
    }

    return (
    <Box display="flex" spacing={2} flexDirection="row" color="primary" style={{alignItems:"baseline"}}>
        <TextField
            fullWidth
            variant="outlined"
            id="number-field"
            label={props.fieldText}
            type="number"
            size="small"
            onChange={handleFieldChange}
            InputProps={{inputProps:{step:0.1, min:0, max:2}}}
        />
        <Button color="primary" variant="outlined" onClick={sendValue}>
            {props.buttonText}
        </Button>

    </Box>
    );
}
