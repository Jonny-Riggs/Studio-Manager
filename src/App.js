import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home/home';
import Contact from './contact/contact'
import Nav from './nav';
import Auth from './auth';
import Gear from './gear/gear';
import Meeting from './meeting/meeting'
import Session from './session/session'
import Show from './show/show'

class App extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    isAuth: false,
    register: false,
    showUserForm: false,
    user: '',
    showSellForm: false,
    login: true,
    studio_manager: ''
  };

  componentDidMount() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    fetch(`http://127.0.0.1:8000/manager/`)
    .then(r => r.json())
    .then(response => {
        this.setState({studio_manager:  response[0].id})
    })
    if (token) {
      console.log('user still logged in', user);
      this.setState({
        isAuth: true,
        user: user,
        token: token
      });
    }
  }

  setAuthState(authObj) {
    this.setState(authObj);
  }

  logOut() {
    console.log('log OUT', localStorage.getItem('token'));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Set everything to false again?
    this.setAuthState({
      isAuth: false,
      user: '',
    });
    console.log(localStorage.getItem('token'));
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav
              isAuth={this.state.isAuth}
              user={this.state.user}
              setAuthState={obj => this.setAuthState(obj)}
              logOut={() => this.logOut()}
            />
            {this.state.showUserForm ? (
              <Auth
              // {...props}
                authState={this.state}
                setAuthState={obj => this.setAuthState(obj)}
              />
            ) : null}
            <Route exact path="/contact" render={(props) => {
              return <Contact {...props} token={this.state.token} studio_manager={this.state.studio_manager} />
            }} />
            <Route path="/home" component={Home} />
            <Route exact path="/gear" render={(props) => {
              return <Gear {...props} token={this.state.token} studio_manager={this.state.studio_manager} />
            }} />
            <Route path="/meeting" component={Meeting} />
            <Route path="/session" component={Session} />
            <Route path="/show" component={Show} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
