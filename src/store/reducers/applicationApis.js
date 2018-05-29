import * as actionTypes from 'actionTypes'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
const initialState = {
  loginPath:
    'http://localhost:8080/hr-business-services-rest/business-services/login',
  connected: false,
  isManager: [],
  isEmployee: [],
  selectedRole: null,
  rules: [],
  personnalHistory: [],
  nudossNumber: 0,
  collaborators: [],
  collaboratorsHistory: [],
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
          role => role['@category'] == 'SSMNG'
        )

        isEmployee = action.data.roles.role.filter(
          role => role['@category'] == 'SSEMP'
        )
        if (isAdmin !== null) {
          selectedRole = 'admin'
        } else if (isEmployee !== null) {
          selectedRole = 'employee'
        }
        return {
          connected: true,
          roles: action.data.roles.role,
          isAdmin: isAdmin,
          isEmployee: isEmployee,
          selectedRole: selectedRole,
        }
      }
      if (action.data.status == 'FAILURE') {
        console.log('failed')
        return { connected: false }
      }
      break

    case actionTypes.GPIT_CONNECT:
      return {}
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
      console.log('here state', action.data)
      return {
        ...state,
        collaboratorsHistory: action.data,
      }
  }
  return state
}

export default reducer
