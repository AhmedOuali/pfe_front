import * as actionTypes from 'actionTypes'
import * as constants from '../../constants'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
const initialState = {
  loginPath: constants.BASE_ADRESS+'login',
  connected: false,
  isManager: [],
  isEmployee: [],
  selectedRole: null,
  rules: [],
  personnalHistory: [],
  nudossNumber: 0,
  collaborators: [],
  collaboratorsHistory: [],
  managerTasks: [],
  requests: [],
  requestsToCancel: [] 
}

// Application Apis reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GPIT_CONNECT_RESULT:
      if (action.data.status == 'OK') {
        console.log('connected')
        var isAdmin
        var isEmployee
        var selectedRole
        isAdmin = action.data.roles.role.filter(
          role => role['@model'] == 'MMGRHIE'
        )

        isEmployee = action.data.roles.role.filter(
          role => role['@model'] == 'EMPLOYEE'
        )
        if (isAdmin !== null) {
          selectedRole = 'admin'
        } else if (isEmployee !== null) {
          selectedRole = 'employee'
        }
        return {
          ...state,
          connected: true,
          roles: action.data.roles.role,
          isAdmin: isAdmin,
          isEmployee: isEmployee,
          selectedRole: selectedRole
        }
      }
      if (action.data.status == 'FAILURE') {
        console.log('failed')
        return { connected: false }
      }
      break

    case actionTypes.GPIT_CONNECT:
      return {
        ...state
      }
      break
    case actionTypes.SET_USER_ROLE:
      return {
        ...state,
        selectedRole: action.data,
      }
      break
    case actionTypes.SET_NUDOSS_NUMBER:
      return {
        ...state,
        nudossNumber: action.data,
      }
      break
    case actionTypes.SET_PERSONNAL_HISTORY:
      return {
        ...state,
        personnalHistory: action.data,
      }
      break
    case actionTypes.SET_COLLABORATORS_NUDOSS:
      return {
        ...state,
        collaborators: action.data,
      }
      break
    case actionTypes.SET_COLLABORATORS_HISTORY:
      return {
        ...state,
        collaboratorsHistory: action.data,
      }
      break
    case actionTypes.SET_MANAGER_TASKS:
      return {
        ...state,
        managerTasks: action.data
      }
      break
    case actionTypes.SET_REQUESTS:
    return {
      ...state,
      requests: action.data
    }
      break
    case actionTypes.SET_REQUESTS_TO_CANCEL:
    return {
      ...state,
      requestsToCancel: action.data
    }
  }
  return state
}

export default reducer
