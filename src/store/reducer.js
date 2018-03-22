const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {
  if (action.type == 'INC_COUNTER') {
    console.log('From Redux: dispatch INC_COUNTER')
    return {
      counter: state.counter + 1,
    }
  }

  if (action.type == 'DEC_COUNTER') {
    console.log('From Redux: dispatch DEC_COUNTER')
    return {
      ...state,
      counter: state.counter - 1,
    }
  }
  return state
}

export default reducer
