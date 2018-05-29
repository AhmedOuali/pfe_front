import * as actionTypes from 'actionTypes'
const initialState = {
  height: 0,
  tab: 0,
  username: '',
  stepperNumber: 0,
  allowNotifications: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HEADER_HEIGHT:
      return {
        ...state,
        height: action.data,
      }
      break

    case actionTypes.SET_HEADER_TAB:
      return {
        ...state,
        tab: action.data,
      }
      break

    case actionTypes.SET_HEADER_NAME:
      return {
        ...state,
        username: action.data,
      }
      break

    case actionTypes.SET_STEPPER_NUMBER:
      return {
        ...state,
        stepperNumber: action.data,
      }
      break
    case actionTypes.SET_ALLOW_NOTIFICATIONS:
      return {
        ...state,
        allowNotifications: action.data,
      }
  }
  return state
}

export default reducer
