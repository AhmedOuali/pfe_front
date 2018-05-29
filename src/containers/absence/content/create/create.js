import React, { Component, Fragment } from 'react'
import * as headerActionCreators from '../../../../store/actions/header'
import * as applicationApisActionCreators from '../../../../store/actions/applicationApis'
import * as absenceTypes from './absenceTypes'
import Footer from './Footer'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

import { connect } from 'react-redux'

class Create extends Component {
  state = {
    premier: '',
    dernier: '',
    pam: '',
    ram: '',
    type: '',
    creerAbsence: null,
  }
  handleChange = name => event => {
    if (name == 'premier' || name == 'dernier') {
      var s = event.target.value
      if (s) {
        s = s.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match, y, m, d) {
          return m + '/' + d + '/' + y
        })
      }
      this.setState({ [name]: s })
    } else {
      this.setState({ [name]: event.target.value })
    }
  }
  componentWillMount() {
    this.setState({
      creerAbsence: this.props.creerAbsence,
    })
  }
  render() {
    console.log(absenceTypes)
    const AbsenceTypeOptionsFactory = props => {
      var result = []
      for (let element in props.options) {
        result.push(
          <option value={props.options[element].value}>
            {props.options[element].description}
          </option>
        )
      }
      console.log(result)
      return result
    }

    return (
      <Fragment>
        <div
          style={{
            paddingTop: '15px',
            marginLeft: '10px',
            marginRight: '10px',
          }}
        >
          <FormControl style={{ display: 'flex' }}>
            <InputLabel htmlFor="age-native-simple">Type d'absence</InputLabel>
            <Select
              native
              value={this.state.type}
              onChange={this.handleChange('type')}
              inputProps={{
                id: 'age-native-simple',
              }}
            >
              <option value="" />
              <AbsenceTypeOptionsFactory options={absenceTypes} />
            </Select>
            <form noValidate>
              <TextField
                style={{ display: 'flex', marginTop: '30px' }}
                id="date"
                label="Premier jour *"
                type="date"
                onChange={this.handleChange('premier')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <FormControlLabel
              style={{ display: 'flex', marginTop: '30px' }}
              control={
                <Checkbox
                  onChange={this.handleChange('pam')}
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  value="checkedI"
                />
              }
              label="Part dans l’après-midi"
            />
            <form noValidate>
              <TextField
                style={{ display: 'flex', marginTop: '30px' }}
                id="date"
                label="Birthday"
                type="date"
                onChange={this.handleChange('dernier')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <FormControlLabel
              style={{ display: 'flex', marginTop: '30px' }}
              control={
                <Checkbox
                  onChange={this.handleChange('ram')}
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  value="X"
                />
              }
              label="Revient dans l’après-midi"
            />
          </FormControl>
        </div>
        <Footer {...this.state} />
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    tab: state.header.tab,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
    creerAbsence: absence =>
      dispatch(applicationApisActionCreators.creerAbsence(absence)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Create)
