import * as actionTypes from 'actionTypes'
const initialState = {
  loginPath:
    'http://localhost:8080/hr-business-services-rest/business-services/login',
  connected: false,
  loginResponse: {},
}

// Application Apis reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GPIT_CONNECT_RESULT:
      if (action.data.status == 'OK') {
        return { connected: true }
      }
      if (action.data.status == 'FAILURE') {
        return { connected: false }
      }
      break

    case actionTypes.GPIT_CONNECT:
      return {}
      break
  }
  return state
}

export default reducer
