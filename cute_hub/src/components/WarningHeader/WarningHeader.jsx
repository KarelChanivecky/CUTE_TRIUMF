import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    color: {
        borderRadius: "5px",
        backgroundColor: "lightgreen",
        margin: "0.5em",
        padding: "0.7em"
    }

}));


function WarningHeader(props) {

    const classes = useStyles();

    return (
        <h6 className={classes.color}>System available</h6>
    );
}

export default WarningHeader;
