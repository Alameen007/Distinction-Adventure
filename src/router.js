import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import IndexPage from './routes/IndexPage'
import LoginPage from './routes/login'
import Tasks from './routes/tasks'
import Nigeria from './routes/tasks/contries/nigeria'
import HumanSkeletalSystem from './routes/tasks/science/humanSkeletor'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

function RouterConfig ({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login"
          children={({ match, ...rest }) => {
          registerModel(app, require('./models/login').default)
          return (<LoginPage />)
        }}
        />
        <Route path="/tasks"
          children={({ match, ...rest }) => {
          registerModel(app, require('./models/tasks').default)
          return (<Tasks />)
        }}
        />
        <Route path="/nigeria"
          children={({ match, ...rest }) => {
          registerModel(app, require('./models/tasks').default)
          return (<Nigeria />)
        }}
        />
        <Route path="/human-skeletal-system"
          children={({ match, ...rest }) => {
          registerModel(app, require('./models/tasks').default)
          return (<HumanSkeletalSystem />)
        }}
        />
      </Switch>
    </Router>
  )
}

export default RouterConfig
