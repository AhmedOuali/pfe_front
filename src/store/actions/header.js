import * as actionTypes from 'actionTypes'

export const setHeaderHeight = data => {
  return {
    type: actionTypes.SET_HEADER_HEIGHT,
    data: data,
  }
}

export const setHeaderTab = data => {
  return {
    type: actionTypes.SET_HEADER_TAB,
    data: data,
  }
}

export const setHeaderName = data => {
  return {
    type: actionTypes.SET_HEADER_NAME,
    data: data,
  }
}

export const setStepperNumber = data => {
  return {
    type: actionTypes.SET_STEPPER_NUMBER,
    data: data,
  }
}

export const setAllowNotifications = data => {
  return {
    type: actionTypes.SET_ALLOW_NOTIFICATIONS,
    data: data,
  }
}
