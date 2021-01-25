import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Credit from './Components/Credits'
import Debit from './Components/Debits';
import Home from './Components/Home';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0.00,
      currentUser: {
        userName: "richardljohn",
        memberSince: "01/04/2021"
      },
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName=logInInfo.userName
    this.setState({currentUser:newUser})
  }
  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent=() => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<Login user={this.state.currentUser} mockLogIn= {this.mockLogin} {...this.props}/>)
    return (
      <Router>
        <div>
          <Route exact path="/" render={Home}/>
          <Route exact path="/userProfile" render={UserProfile} />
          <Route exact path="/login" render={Login} />
          <Route exact path='/debits' component={Debit} />
          <Route exact path='/credits' component={Credit} />
        </div>
      </Router>
    );
  }
}

export default App;