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
    data: data
  }
}

export const setHeaderName = data => {
  return {
    type: actionTypes.SET_HEADER_NAME,
    data: data
  }
}
