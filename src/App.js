import React, {Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layouts/Navbar'
import Alert from './components/layouts/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
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
          <Route exact path='/' render={ props => (
            <Fragment>
              <Search/>
              <Users />
            </Fragment>
          )}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/users/:login' component={User}/>
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