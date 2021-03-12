import React from 'react';
import "./ToggleHeader.css";
import IconButton from "@material-ui/core/IconButton";
import ChangeHistoryRounded from "@material-ui/icons/ChangeHistoryRounded";
import HelpRounded from "@material-ui/icons/HelpRounded";
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

/**
 * Renders a transparent header bar with a toggle and help buttons
 * @param {Function} props.onHelp A help button click handler
 * @param {Function} props.onToggle A toggle button click handler
 */
function ToggleHeader(props) {
    const MinimizeButton = !props.minimizable ? <span/> :
        <IconButton className={"toggle_btn th_btn"} onClick={props.onToggle}>
            <ChangeHistoryRounded/>
        </IconButton>;

    const HelpButton = !props.helpable ? <span/> :
        <IconButton className={"help_btn th_btn"} onClick={props.onHelp}>
            <HelpRounded/>
        </IconButton>;

    const Name = props.name ? <Typography variant="h3">{props.name}</Typography> : <></>

    const justify = props.minimizable ? 'space-between' : 'flex-end';

    return (
        <Grid container>
            <Grid item container justify={"space-between"} xs={12} lg={12} alignItems="center">
                {MinimizeButton}
                {Name}
                {HelpButton}
            </Grid>
        </Grid>
    )
}


export default ToggleHeader;

