import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { BrowserRouter as Router } from 'react-router-dom'
import combinedReducer from './store/combinedReducer'
import combinedEpics from './store/combinedEpics'
import {
  Wrapper
} from './styles/content'
import { WorldHappiness } from './pages'

const epicMiddleware = createEpicMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(
  combinedReducer,
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
)
epicMiddleware.run(combinedEpics)

class App extends Component {
  componentDidMount() {
    var elem = ReactDOM.findDOMNode(this)

    elem.style.opacity = 0
    window.requestAnimationFrame(function() {
      elem.style.transition = "opacity 1200ms"
      elem.style.opacity = 1
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Wrapper>
            <WorldHappiness />
          </Wrapper>
        </Router>
      </Provider>
    )
  }
}

export default App
