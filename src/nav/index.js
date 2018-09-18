import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Nav extends Component {
  displayLogin() {
    this.props.setAuthState({
      register: false,
      showUserForm: true,
    });
  }

  logOut() {
    this.props.logOut();
  }

  render() {
    const isAuth = this.props.isAuth;
    console.log('isAuth?', isAuth);
    return (
      <div className="ui inverted menu">
        <Link to="/home" className="red active item">Home</Link>
        <Link to="/gear" className="red active item">Gear</Link>
        <Link to="/contact" className="red active item">Contacts</Link>
        <Link to="/meeting" className="red active item">Book A Meeting</Link>
        <Link to="/session" className="red active item">Book A Session</Link>
        <Link to="/show" className="red active item">Shows</Link>
        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i aria-hidden="true" className="search icon" />
            </div>
          </div>
          <a
            className="item"
            onClick={() => (isAuth ? this.logOut() : this.displayLogin())}
          >
            {' '}
            Log {isAuth ? 'out' : 'in'}{' '}
          </a>
        </div>
      </div>
    );
  }
}
