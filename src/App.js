import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layouts/Navbar'
import Alert from './components/layouts/Alert'
import User from './components/users/User'
import About from './components/pages/About'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

const App = () => {
  return (
    <GithubState>
    <AlertState>
    <Router>
    <div className="App">
      <Navbar/>
      <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/users/:login' component={User}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>
    </Router>
    </AlertState>
    </GithubState>
  );  
}
/* <Route exact path='/users/:login' render={ props => (
  <User {...props}/>
) }/>     */
export default App;