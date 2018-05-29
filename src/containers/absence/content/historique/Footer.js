import React from 'react'
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

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { connect } from 'react-redux'
import * as headerActionCreators from '../../../../store/actions/header'

const Footer = props => {
  const handleChange = event => {
    console.log(event.target.value)
    var selectedCollaborator
    props.collaborators.map(element => {
      if (element.nudoss == event.target.value) {
        selectedCollaborator = element
      }
    })
    if(selectedCollaborator == undefined || selectedCollaborator == null){
      selectedCollaborator = {NMPRES: "",nudoss: ""}
    }
    props.handleChange(selectedCollaborator)
  }
  const AbsenceTypeOptionsFactory = props => {
    var result = []
    for (let element in props.options) {
      result.push(
        <option value={props.options[element].nudoss}>
          {props.options[element].NMPRES}
        </option>
      )
    }
    console.log(result)
    return result
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
        <ToolbarTitle text="Recherche filtrée" />
        <div>
          <div
            style={{
              marginLeft: '10px',
              marginTop: '-10px',
              marginRight: '10px',
              width: '200px',
            }}
          >
            <FormControl style={{ display: 'flex', marginTop: '1px' }}>
              <InputLabel
                htmlFor="age-native-simple"
                style={{ marginTop: '1px' }}
              >
                Mon Equipe{' '}
              </InputLabel>
              <Select
                native
                value={props.value.nudoss}
                onChange={handleChange}
                inputProps={{
                  id: 'age-native-simple',
                }}
              >
                <option value="" />
                <AbsenceTypeOptionsFactory options={props.collaborators} />
              </Select>
            </FormControl>
          </div>
        </div>
      </ToolbarGroup>
    </Toolbar>
  )
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
