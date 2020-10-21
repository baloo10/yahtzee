import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  

 
  render() {
    /** if the score is undefined, then the user can not click it, and add the score
     * we also dynamic add classes, if its undefined then add active, else add disabled in the class
     */
      
     const {score, name, doScore, description} = this.props;
     //if score is not equals to undefined, then disable is set to true
     const disabled = score !=undefined;
     
    return (
      <tr 
      className={`RuleRow RuleRow-${disabled ? "disabled": "active"}`} 
        onClick={disabled ? null :  doScore  }>
        <td className="RuleRow-name">{name}</td>
    <td className="RuleRow-score"> {disabled ? score : description}  </td>
      </tr>
    )
  }
}

export default RuleRow;