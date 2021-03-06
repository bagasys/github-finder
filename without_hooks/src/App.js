import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layouts/Navbar'
import Alert from './components/layouts/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import axios from 'axios'

class App extends React.Component {
  // componentDidMount(){
  //   axios.get('https://api.github.com/users').then(res => console.log(res.data))
  // }
  state = {
    users: [],
    user: {},
    loading: false,
    alert: {msg: '', type: ''},
    repos: []
  }
  // async componentDidMount(){
  //   this.setState({loading: true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState({users: res.data, loading: false})
  // }

  searchUsers = async (text) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users: res.data.items, loading: false})
  }

  clearUsers = () => {
    this.setState({users: [], loading: false})
  }

  getUser = async (username) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({user: res.data, loading: false})
  }

  getUserRepos = async (username) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({repos: res.data, loading: false})
  }

  setAlert = (msg, type) => {
    this.setState({alert: {msg: msg, type: type}})
    setTimeout(() => this.setState({alert: {msg: '', type: ''}}), 5000)
  }

  render(){
    return (
      <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={ props => (
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert}/>
                <Users loading={this.state.loading} users={this.state.users}/>
              </Fragment>
            )}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/users/:login' render={ props => (
              <User {...props} getUser={this.getUser} user={this.state.user} loading={this.state.loading} getUserRepos={this.getUserRepos} repos={this.state.repos}/>
            ) }/>    
          </Switch>

        </div>
      </div>
      </Router>
    );
  }
}

export default App;
