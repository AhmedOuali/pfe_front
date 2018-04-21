import * as actionTypes from 'actionTypes'

export const incCounter = () => {
  return {
    type: actionTypes.INC_COUNTER,
  }
}

export const decCounter = () => {
  return {
    type: actionTypes.DEC_COUNTER,
  }
}
