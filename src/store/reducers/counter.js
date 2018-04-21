import * as actionTypes from 'actionTypes'
const initialState = {
  counter: 0,
}

//Counter reducer
const reducer = (state = initialState, action) => {
  if (action.type == actionTypes.INC_COUNTER) {
    return {
      counter: state.counter + 1,
    }
  }

  if (action.type == actionTypes.DEC_COUNTER) {
    return {
      ...state,
      counter: state.counter - 1,
    }
  }
  return state
}

export default reducer
