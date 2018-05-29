import React, { Component, Fragment } from 'react'

import CustomizedTable from './absenceDataTable'

import { connect } from 'react-redux'
import * as headerActionCreators from '../../../../store/actions/header'
import * as applicationApisActionCreators from '../../../../store/actions/applicationApis'
import Footer from './Footer'

class Historique extends Component {
  constructor(props) {
    super(props)
    props.setHeaderTab(2)
  }
  state = {
    open: false,
    selectedCollaborator: { NMPRES: '', nudoss: '' },
    historyData: [],
  }

  handleChange = collaborator => {
    this.setState({ selectedCollaborator: collaborator })
    console.log(this.state)
  }

  componentWillMount() {
    if (this.props.isEmployee.length > 0) {
      console.log(this.props.isEmployee)
      this.props.searchForPersonnalHistory()
    }

    if (this.props.isAdmin.length > 0) {
      this.props.searchForCollaborators()
      this.props.searchForCollaboratorsHistory()
    }
  }

  filterCollaboratorsHistory = () => {
    try{
      if(this.state.selectedCollaborator.nudoss !== undefined &&this.state.selectedCollaborator.nudoss !== '' &&
      this.props.collaboratorsHistory !== undefined
    ){
      return this.props.collaboratorsHistory.filter(
        collaborator =>
          collaborator.nudoss == this.state.selectedCollaborator.nudoss
      )
    }}catch(err){
      return this.props.collaboratorsHistory;
    }


    return this.props.collaboratorsHistory
  }

  render() {
    const EmployeePart = props => {
      return (
        <Fragment>
          {Array.isArray(this.props.personnalHistory) ? (
            <CustomizedTable
              selectedRole={this.props.selectedRole}
              historyData={this.props.personnalHistory}
            />
          ) : (
            <CustomizedTable
              selectedRole={this.props.selectedRole}
              historyData={[]}
            />
          )}
        </Fragment>
      )
    }

    const ManagerPart = props => {
      return (
        <Fragment>
          {Array.isArray(this.props.collaboratorsHistory) ? (
            <CustomizedTable
              collaborators={this.props.collaborators}
              selectedRole={this.props.selectedRole}
              historyData={this.filterCollaboratorsHistory()}
            />
          ) : (
            <CustomizedTable
              selectedRole={this.props.selectedRole}
              historyData={[]}
            />
          )}
          <Footer
            {...props}
            handleChange={this.handleChange}
            value={this.state.selectedCollaborator}
          />
        </Fragment>
      )
    }
    return (
      <Fragment>
        {this.props.selectedRole == 'admin' ? (
          <ManagerPart {...this.props} />
        ) : (
          <EmployeePart {...this.props} />
        )}
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    tab: state.header.tab,
    personnalHistory: state.applicationApi.personnalHistory,
    isAdmin: state.applicationApi.isAdmin,
    isEmployee: state.applicationApi.isEmployee,
    selectedRole: state.applicationApi.selectedRole,
    collaborators: state.applicationApi.collaborators,
    collaboratorsHistory: state.applicationApi.collaboratorsHistory,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
    searchForCollaborators: () =>
      dispatch(applicationApisActionCreators.searchForCollaborators()),
    searchForPersonnalHistory: () =>
      dispatch(applicationApisActionCreators.searchForPersonnalHistory()),
    searchForCollaboratorsHistory: () =>
      dispatch(applicationApisActionCreators.searchForCollaboratorsHistory()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Historique)
