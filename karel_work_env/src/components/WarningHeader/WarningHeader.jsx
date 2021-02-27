import React from 'react';
import {Alert} from "@material-ui/lab";


function WarningHeader(props) {
    const alertText = "System available";
    const alertSeverity = "success";
    return (
        <Alert variant="filled" severity={alertSeverity}>{alertText}</Alert>
    );
}

export default WarningHeader;
