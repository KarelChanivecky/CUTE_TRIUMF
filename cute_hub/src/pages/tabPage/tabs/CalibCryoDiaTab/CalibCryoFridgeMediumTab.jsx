import React from 'react'
import PlaceholderWidget from "../../../../widgets/placeholder/placeholderWidget";
import {Grid, Typography, withStyles} from "@material-ui/core";
import DiagramWidget from "../../../../widgets/DiagramWidget/DiagramWidget";

import CryoStatWidget from "../../../../widgets/CryostatWidget/CryoStatWidget";
import CalibrationWidget from "../../../../widgets/CuteCalibrationWidget/CalibrationWidget";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {WidgetNames} from "../../../../constants/widgetNames";
import {ModuleDisplayStates} from "../../../../constants/moduleDisplayStates";


// Styles from example in Material UI docs: https://material-ui.com/components/accordion/
const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);


function CalibCryoDiagWideTab(props) {
    const [expanded, setExpanded] = React.useState(WidgetNames.CALIBRATION);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    // console.log("in accordian")
    return (
        <div>
            <Accordion expanded={expanded === WidgetNames.DIAGRAM} onChange={handleChange(WidgetNames.DIAGRAM)}>
                <AccordionSummary>
                    <Typography variant="h3">{WidgetNames.DIAGRAM}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DiagramWidget displayState={ModuleDisplayStates.OPEN} noName/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === WidgetNames.CRYOSTAT} onChange={handleChange(WidgetNames.CRYOSTAT)}>
                <AccordionSummary>
                    <Typography variant="h3">{WidgetNames.CRYOSTAT}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CryoStatWidget noName/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === WidgetNames.CALIBRATION} onChange={handleChange(WidgetNames.CALIBRATION)}>
                <AccordionSummary >
                    <Typography variant="h3">{WidgetNames.CALIBRATION}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CalibrationWidget noName helpable displayState={ModuleDisplayStates.MINIMIZED}/>
                </AccordionDetails>
            </Accordion>

        </div>

)
}


export default CalibCryoDiagWideTab
