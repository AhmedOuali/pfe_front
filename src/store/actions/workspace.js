import * as actionTypes from 'actionTypes'

export const setNotifications = data => {
  return {
    type: actionTypes.SET_NOTIFICATIONS,
    data: data,
  }
}

export const addNotification = data => {
  return {
    type: actionTypes.ADD_NOTIFICATION,
    data: data,
  }
}

export const setConnectivity = data => {
  return {
    type: actionTypes.SET_CONNECTIVITY,
    data: data,
  }
}
