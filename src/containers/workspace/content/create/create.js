import React, { Component, Fragment } from 'react'
import * as headerActionCreators from '../../../../store/actions/header'
import Footer from './Footer'
import { connect } from 'react-redux'
//Form components imports
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField'
import { Radio } from 'rmwc/Radio'
import RadioButtonExampleSimple from './FormComponents/RadioButtonExampleSimple'
import RadioButton from './FormComponents/RadioButton'

import FloatingActionButtonAdd from './FormComponents/FloatingActionButtonAdd'

import FloatingActionButtonExampleSimple from './FormComponents/FloatingActionButtonExampleSimple'
import DatePickerExampleSimple from './FormComponents/DatePickerExampleSimple'

import CheckboxExampleSimple from './FormComponents/CheckboxExampleSimple'

import Divider from 'material-ui/Divider'
import { Select } from 'rmwc/Select'
import formStyle from './FormComponents/formStyle.css'

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  customWidth: {
    width: 150,
  },
}

const persons = [
  { value: 0, name: 'Qualif 1' },
  { value: 1, name: 'Qualif 2' },
  { value: 2, name: 'Qualif 3' },
  { value: 3, name: 'Qualif 4' },
  { value: 4, name: 'Qualif 5' },
  { value: 5, name: 'Qualif 6' },
]

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = { country: '', region: '', value: 1, values: [] }
  }

  handleChange = (event, index, value) => this.setState({ value })
  handleChange = (event, index, values) => this.setState({ values })

  selectionRenderer = values => {
    switch (values.length) {
      case 0:
        return ''
      case 1:
        return persons[values[0]].name
      default:
        return `${values.length} Qualification(s) selectionnée(s)`
    }
  }

  menuItems(persons) {
    return persons.map(person => (
      <MenuItem
        key={person.value}
        insetChildren={true}
        checked={this.state.values.indexOf(person.value) > -1}
        value={person.value}
        primaryText={person.name}
      />
    ))
  }

  selectCountry(val) {
    this.setState({ country: val })
  }

  selectRegion(val) {
    this.setState({ region: val })
  }

  render() {
    const FirstStep = props => {
      const { country, region } = this.state

      return (
        // <Fragment>
        //     <h1>Test Step1</h1>
        //     {/* Ici c'est le form d'inscription numero 1 */}
        // </Fragment>

        <Fragment>
          <div className="form">
            <h4 className="titre"> Identité </h4>
            <br />
            <RadioButtonExampleSimple />
            {/* Standard text field. */}
            <TextField label="Prénom" />
            &nbsp;&nbsp;
            {/* Standard text field. */}
            <TextField label="Nom" />
            <p />
            <Divider />
            <h4 className="titre"> Naissance </h4>
            <DatePickerExampleSimple />
            <div>
              <CountryDropdown
                value={country}
                onChange={val => this.selectCountry(val)}
              />
              <RegionDropdown
                country={country}
                value={region}
                onChange={val => this.selectRegion(val)}
              />
            </div>
            <p />
            <Divider />
            <h4 className="titre"> Télécharger la photo</h4>
            <div className="addImg">
              <FloatingActionButtonExampleSimple />

              <br />
              <br />
              <br />
            </div>
          </div>
          <Footer />

          <Footer />
        </Fragment>
      )
    }
    const SecondStep = props => {
      const { country, region } = this.state

      return (
        <Fragment>
          <div className="form">
            <br />
            <h4 className="titre">Nationalité principale</h4>
            <div>
              <CountryDropdown
                value={country}
                onChange={val => this.selectCountry(val)}
              />
            </div>
            <br />
            <Divider />
            <h4 className="titre">Adresse</h4>
            <table>
              <tr>
                <td>
                  <p className="rowtext"> Type: </p>
                </td>
                <td>
                  <SelectField
                    floatingLabelText="Type"
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                  >
                    <MenuItem value={1} primaryText="Adresse domicile" />
                    <MenuItem value={2} primaryText="Adresse Postale" />
                  </SelectField>
                </td>

                <td className="tddrop">
                  <div>
                    <CountryDropdown
                      classes="drop"
                      value={country}
                      onChange={val => this.selectCountry(val)}
                    />
                  </div>

                  <div>
                    <RegionDropdown
                      classes="drop"
                      country={country}
                      value={region}
                      onChange={val => this.selectRegion(val)}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="width">
                  <p> Code Postal: </p>
                </td>
                <td className="postal">
                  <TextField label="CP" />
                </td>
              </tr>
            </table>
            <h4 className="titre"> Ajouter une nouvelle adresse</h4>
            <div className="addImg">
              <FloatingActionButtonAdd />
            </div>
          </div>
        </Fragment>
      )
    }
    const ThirdStep = props => {
      return (
        <Fragment>
          <div className="form">
            <br />
            <h4 className="unité titre">Unité Organisationnelle</h4>
            <SelectField
              floatingLabelText="Unités"
              value={this.state.value}
              onChange={this.handleChange}
              style={styles.customWidth}
            >
              <MenuItem value={1} primaryText="Unité 1" />
              <MenuItem value={2} primaryText="Unité 2" />
              <MenuItem value={1} primaryText="Unité 3" />
              <MenuItem value={2} primaryText="Unité 4" />
            </SelectField>
            <br />
            <Divider />
            <h4 className="unité titre">Cadre Contractuel</h4>
            <h5> Poste: </h5>
            <SelectField
              floatingLabelText="Poste"
              value={this.state.value}
              onChange={this.handleChange}
              style={styles.customWidth}
            >
              <MenuItem value={1} primaryText="Poste 1" />
              <MenuItem value={2} primaryText="Poste 2" />
              <MenuItem value={1} primaryText="Poste 3" />
              <MenuItem value={2} primaryText="Poste 4" />
            </SelectField>

            <h5> Qualifications: </h5>
            <SelectField
              multiple={true}
              hintText="Select a name"
              value={this.state.values}
              onChange={this.handleChange}
              selectionRenderer={this.selectionRenderer}
            >
              {this.menuItems(persons)}
            </SelectField>
          </div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        {this.props.stepperNumber === 0 ? (
          <FirstStep />
        ) : this.props.stepperNumber === 1 ? (
          <SecondStep />
        ) : (
          <ThirdStep />
        )}
        <Footer />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    tab: state.header.tab,
    stepperNumber: state.header.stepperNumber,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Create)
