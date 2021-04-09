import React from 'react';
import {makeStyles, Paper} from "@material-ui/core";

/**
 *
 * @param {Object} props.color
 * @param {[]} props.children
 * @param {Object} props.other
 * @param {boolean} props.parentSize
 * @return {JSX.Element}
 * @constructor
 */
function ColoredPaper(props) {
    const {color, children, parentSize, ...other} = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: color ? color.main : '#FFF',
            color: color ? color.contrastText : '#000'
        }
    }));

    const classes = useStyles();

    return (
        <Paper className={classes.root} {...other} >{children}</Paper>
    );
}

export default ColoredPaper;