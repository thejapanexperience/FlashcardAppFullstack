import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import CardViewAndManagement from './components/CardViewAndManagement';
import Categories from './components/Categories';

render(
  <div className="container text-center">
    <Router history = {hashHistory}>
      <Route path = '/' component = {Layout}>

        <IndexRoute component={Welcome}></IndexRoute>
        <Route path='/welcome' component={Welcome}></Route>
        <Route path='/allflashcards' component={CardViewAndManagement}></Route>
        <Route path='/allcategories' component={Categories}></Route>

      </Route>

    </Router>
  </div>,
  document.getElementById('root')
)
