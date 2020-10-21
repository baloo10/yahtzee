import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props){
    super(props);
    this.handleOnOff = this.handleOnOff.bind(this);
  }

  handleOnOff(){
    this.props.handleClick(this.props.idx);
  }
  render() {
    const oooo = this.props.val;
    console.log(" you and me"+ oooo);
    return (
      <button
        className={"Die"}
        style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
        onClick={this.handleOnOff}
        >
        {this.props.val}
        
      </button>
    );
  }
}

export default Die;
