import * as actionTypes from 'actionTypes'
const initialState = {
  notifications: [],
  online: navigator.onLine,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATIONS:
      if (Array.isArray(action.data)) {
        localStorage.setItem('notifications', JSON.stringify(action.data))
        return {
          ...state,
          notifications: action.data,
        }
      }
      break
    case actionTypes.ADD_NOTIFICATION:
      var localNotifs = JSON.parse(localStorage.getItem('notifications'))
      if (Array.isArray(localNotifs)) {
        localNotifs.push(action.data)
      } else {
        localNotifs = []
        localNotifs.push(action.data)
      }
      console.log('test :', JSON.stringify(localNotifs))
      localStorage.setItem('notifications', JSON.stringify(localNotifs))
      var newNotifications = state.notifications.map(notification => {
        return notification
      })
      newNotifications.push(action.data)
      return {
        ...state,
        notifications: newNotifications,
      }
      break
    case actionTypes.SET_CONNECTIVITY:
      return {
        ...state,
        online: action.data,
      }
  }
  return state
}

export default reducer
