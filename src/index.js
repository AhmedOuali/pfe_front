import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import applicationApisReducer from './store/reducers/applicationApis'
import counterReducer from './store/reducers/counter'
import headerReducer from './store/reducers/header'
import workspaceReducer from './store/reducers/workspace'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
// Un middleware qui intercepte le workflow Redux afin de capter les operations asynchrones
import thunk from 'redux-thunk'
import * as midlewares from './middleware'

// Fonction qui va etre executée par le middleware de redux

// Création d'un rootReducer qui englobe les reducers elementaires
const rootReducer = combineReducers({
  applicationApi: applicationApisReducer,
  ctr: counterReducer,
  header: headerReducer,
  workspace: workspaceReducer,
})

// Mise en place de l'inspecteur react qui va se connecter à react-dev-tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//Creaction du store qui prend en parametre le Reducer et nos middleWare
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, midlewares.logger))
)
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

//registration du ServiceWorkers
registerServiceWorker()
