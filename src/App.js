import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import './App.css'

// Importing Components
import Category from './components/CategoryView'
import CreatePost from './components/CreatePostView'
import Home from './components/MainPage'
import PostDetail from './components/PostDetailView'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, thunk))
)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/create-post' component={CreatePost} />
            <Route exact path='/:category' component={Category} />
            <Route path='/:category/:post_id' component={PostDetail} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
