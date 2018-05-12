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
        console.log('connected')
        return { connected: true }
      }
      if (action.data.status == 'FAILURE') {
        console.log('failed')
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
