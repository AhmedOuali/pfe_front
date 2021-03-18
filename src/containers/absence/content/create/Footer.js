import React, {Component, Fragment} from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} from 'material-ui/Toolbar'
import ActionSend from 'material-ui/svg-icons/content/send'
import ActionDone from 'material-ui/svg-icons/action/done-all'

import { connect } from 'react-redux'
import * as headerActionCreators from '../../../../store/actions/header'

class Footer extends Component {
  state = {
    label: "",
    labelStyle: {},
    buttonLabel: "Envoyer"

  }
  render() {
    
  console.log('here the state', this.props)
  const incStepper = () => {
    if (this.props.stepperNumber < 3) {
      this.props.setStepperNumber(this.props.stepperNumber + 1)
    }
  }

  const decStepper = () => {
    if (this.props.stepperNumber > 0) {
      this.props.setStepperNumber(this.props.stepperNumber - 1)
    }
  }

  const handleClick = () => {
    console.log('click')
    var absence = {
      occurrences: {
        occurrence: [
          {
            '@action': 'C',
            '@datasection': 'Z5A1',
            '@domain': 'PROCESS',
            '@dossier': '58565',
            '@population': 'WORKFLOW',
            data: [
              { item: 'calledWS', value: 0 },
              { item: 'elementRequired', value: true },
              { item: 'MOTIFA', value: this.props.type },
              { item: 'DATDEB', value: this.props.premier },
              { item: 'DATFIN', value: this.props.dernier },
              { item: 'hasError', value: false },
              { item: 'messageServer', value: false },
            ],
          },
        ],
      },
    }
    if (this.props.ram) {
      absence.occurrences.occurrence[0].data.push({
        item: 'TEMFIN',
        value: 'X',
      })
    }
    if (this.props.pam) {
      absence.occurrences.occurrence[0].data.push({
        item: 'TEMDEB',
        value: 'X',
      })
    }
    this.props.creerAbsence(absence)
    .then(resp => resp.json())
      .then(res => {
        console.log(res)
        if(res.status == "OK") {
          this.setState({labelStyle: {fontSize: "12px", color: "green"}, label: 'OK: Demande créer avec succés' })
        }else {
          this.setState({labelStyle: {fontSize: "12px", color: "red"}, label: 'Erreur: '+res.errors.error.label })
        }
      })
      .catch(function(err) {
        console.log(err)
        this.setState({label: 'Erreur: Erreur réseau',labelStyle: {fontSize: "12px", color: "red"}})
        console.log('creation Failed: erreur du réseau')
      })
  }
  return (
    <Toolbar
      style={{
        backgroundColor: '#e4e4e4',
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        padding: '0px 8px',
        zIndex: '2',
      }}
    >
      <ToolbarGroup style={{ width: '100%' }}>
        <ToolbarTitle style={this.state.labelStyle} text={this.state.label} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <RaisedButton
            label={this.state.buttonLabel}
            onClick={handleClick}
            labelColor="#000000ba"
            backgroundColor={
              this.props.stepperNumber >= 2 ? 'rgba(0, 0, 0, 0.87)' : '#e4e4e4'
            }
            labelPosition="before"
            icon={
              this.props.stepperNumber === 2 ? (
                <ActionSend />
              ) : this.props.stepperNumber === 3 ? (
                <ActionDone />
              ) : (
                ''
              )
            }
            style={{ margin: '10px 0px', width: '89px' }}
            disabled={this.props.stepperNumber === 3 ? true : false}
            disabledBackgroundColor={'rgba(0, 0, 0, 0.87)'}
            disabledLabelColor={'green'}
          />
        </div>
      </ToolbarGroup>
    </Toolbar>
  )
  }
}


const mapStateToProps = state => {
  return {
    stepperNumber: state.header.stepperNumber,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStepperNumber: step =>
      dispatch(headerActionCreators.setStepperNumber(step)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)
