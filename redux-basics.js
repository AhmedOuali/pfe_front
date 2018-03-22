const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  counter: 0
};

//Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type == "INC_COUNTER") {
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  if (action.type == "ADD_VALUE") {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  console.log("out");
  return state;
};

//Store
const store = createStore(rootReducer);

//Subscribtion
store.subscribe(() => {
  console.log("[subscription]");
  console.log(store.getState());
});

//Dispatching action
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_VALUE", value: 10 });
