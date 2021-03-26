import { Typography } from "@material-ui/core";
import { display } from "@material-ui/system";
import React, { Component } from "react";

class OutputLine extends Component {
  //Scrolls the command line to the bottom always
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div
        id={"commandContainer"}
        style={{
          display: this.props.display,
          width: 530,
          height: 520,
          overflowY: "auto",
          backgroundColor: "black",
          float: "left"
        }}
      >
        {this.props.output.map((text, index) => (
          <div key={text + index} style={{ color: "white", display: "flex", paddingLeft: 5}}>
            <Typography>{text}</Typography>
          </div>
        ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

export default OutputLine;
