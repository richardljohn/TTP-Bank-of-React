import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: null,
      currentUser: {
        userName: 'richardljohn',
        memberSince: '01/04/21',
      },
    }
  }
  

  attemptedLogin = (loginInfo) => {
    const newUser = {...this.state.currentUser};
    newUser.userName = loginInfo.userName;
    this.setState({currentUser: newUser});
  }


  render() {
    const HomeComponent = () => (<Home accountBalance = {this.state.accountBalance}/>);
    const UserProfileComponent=() => (
      <UserProfile userName={this.state.currentUser.userName} memberSince = {this.state.currentUser.memberSince}/>
    );

    const LogInComponent = () => (<Login user={this.state.currentUser} attemptedLogin= {this.attemptedLogin} {...this.props}/>)
    return (
      <Router>
        <div>
          <Route exact path="/" render = {HomeComponent}/>
          <Route exact path="/userProfile" render = {UserProfileComponent}/>
          <Route exact path="/login" render = {LogInComponent}/>
          <Route exact path='/debits' component = {Debits}/>
          <Route exact path='/credits' component = {Credits}/>
        </div>
      </Router>
    );
  }
}

export default App;