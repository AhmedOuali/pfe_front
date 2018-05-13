import React from 'react'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ActionSend from 'material-ui/svg-icons/content/send';
import ActionDone from 'material-ui/svg-icons/action/done-all';

import { connect } from 'react-redux'
import * as headerActionCreators from '../../../../store/actions/header'

const Footer = (props) => {
    const incStepper = () => {
      if(props.stepperNumber<3) {
        props.setStepperNumber(props.stepperNumber+1)
      }   
    }

    const decStepper = () => {
      if(props.stepperNumber>0) {
        props.setStepperNumber(props.stepperNumber-1)
      }
    }
    return (
        <Toolbar style={{backgroundColor: "#e4e4e4" ,position: "fixed", bottom: "0px", width: "100%", padding: "0px 8px", zIndex: "2"}}>
        
        <ToolbarGroup style={{width: "100%"}}>
          <ToolbarTitle text="Enregistrée" />
          <div style={{width: "215px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <RaisedButton 
            label="Precedant" 
            labelPosition="before" 
            onClick={decStepper} 
            labelColor="#f27308" 
            backgroundColor="#e4e4e4" 
            style={{margin: "10px 0px", backgroundColor: "#e4e4e4"}}
            disabled={props.stepperNumber === 3? true:props.stepperNumber ===0?true: false }
          />
          <ToolbarSeparator  style={{marginLeft: "-36px", marginRight: "-35px"}}/>          
          <RaisedButton  
            label={props.stepperNumber === 2? "": props.stepperNumber === 3? "": "Suivant"} 
            onClick={incStepper} labelColor="#f27308" 
            backgroundColor={props.stepperNumber >= 2?"rgba(0, 0, 0, 0.87)":"#e4e4e4"} 
            labelPosition="before"
            icon={props.stepperNumber === 2? <ActionSend/>: props.stepperNumber === 3? <ActionDone/>: "" }
            style={{margin: "10px 0px", width:"89px"}}
            disabled={props.stepperNumber === 3? true: false }
            disabledBackgroundColor={"rgba(0, 0, 0, 0.87)"}
            disabledLabelColor={"green"}
          />
          </div>
        </ToolbarGroup>
      </Toolbar>
    )
}

const mapStateToProps = state => {
  return {
    stepperNumber: state.header.stepperNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStepperNumber : step =>
      dispatch(headerActionCreators.setStepperNumber(step)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)