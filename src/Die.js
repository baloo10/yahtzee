import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    numberWords: ["one", "two", "three", "four", "five", "six"],
    val: 4
  }
  constructor(props){
    super(props);
    this.handleOnOff = this.handleOnOff.bind(this);
  }

  handleOnOff(){
    this.props.handleClick(this.props.idx);
  }
  render() {
    const {numberWords, locked, val, disabled, rolling} = this.props;
    /** We want to take the this.props.val and turn it into a string. We got to have
     * the - 1 after the this.props.val, because that is a array that starts on index 0
     * and on numberWords we have one, so that array have to match the val array
     */
    let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x `;
    //need space after Die-locked, so it will seperate the next class Die-rolling
    if(locked) classes += "Die-locked ";
    if(rolling) classes += "Die-rolling";
    /* gamerOver = if(this.props.rollsLeft === 0) { console.log("over")} 
    disabled = {this.props.rollsLeft === 0} 
    We then return icon with all the classes above*/
    return (
      <i
        className={classes}
        onClick={this.handleOnOff}
        disabled={disabled}

        />         
      
    );
  }
}

export default Die;
