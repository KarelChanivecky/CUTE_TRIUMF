import React from 'react'
import "./ToggleHeader.css";

/**
 * Renders a transparent header bar with a toggle and help buttons
 * @param {Function} props.onHelp A help button click handler
 * @param {Function} props.onToggle A toggle button click handler
 */
function ToggleHeader(props) {

    return (
        <div className="th_btn_container">
            <button className={"toggle_btn th_btn"} onClick={props.onToggle} >toggle</button>
            <button className={"help_btn th_btn"} onClick={props.onHelp}>help</button>
        </div>
    )
}


export default ToggleHeader

