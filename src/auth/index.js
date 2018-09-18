import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';

export default class Auth extends Component {
  onChange(e) {
    const user = { ...this.props.authState };
    user[e.target.name] = e.target.value;
    this.props.setAuthState(user, () => {
      console.log('state', this.props.authState);
    });
  }

  displayRegister() {
    this.props.setAuthState({
      register: true,
      showUserForm: true,
    });
  }

  handleSubmit(e){
    e.preventDefault();
    e.target.reset();
}


  postAuth(route, user) {
    console.log('postAuth called');
    console.log('user?', user);
    return fetch(`http://127.0.0.1:8000/${route}/`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => {
        console.log('auth', response);
        return response.json();
      })
      .then(responseToken => {
        console.log('converted token', responseToken.token);
        localStorage.setItem('token', responseToken.token);
        localStorage.setItem('user', this.props.authState.username);
        return this.props.setAuthState({
          user: this.props.authState.username,
          token: responseToken.token,
          username: '',
          password: '',
          isAuth: true,
        });
      });
  }
  login() {
    // create an object with username and password keys and submit it to the Django API
    const user = {
      username: this.props.authState.username,
      password: this.props.authState.password,
    };
    this.postAuth('api-token-auth', user).then(() => {
      console.log('user logged in!');
    });
  }

  register() {
    // create an object with all the form values and submit it to the Django API
    const user = Object.assign({}, this.props.authState);
    this.postAuth('register', user).then(() => {
      console.log('new user created');
      this.setAuthState({ showUserForm: false });
    });
  }
  render() {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      street,
      city,
      state,
      zip,
      register,
    } = this.props.authState;
    return (
      <div>
        {register && (
          <form className="ui form">
            <div className="field">
              <label>User Name</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <label>User Name</label>
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <label>First Name</label>
              <input
                type="text"
                placeholder="first name"
                name="first_name"
                value={first_name}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="last name"
                name="last_name"
                value={last_name}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <label>Street Address</label>
              <input
                type="text"
                placeholder="street address"
                name="street"
                value={street}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <label>City</label>
              <input
                type="text"
                placeholder="city"
                name="city"
                value={city}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <label>City</label>
              <input
                type="text"
                placeholder="state (NY)"
                name="state"
                value={state}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <label>Zipcode</label>
              <input
                type="text"
                placeholder="zipcode"
                name="zip"
                value={zip}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  className="hidden"
                  readOnly=""
                  tabIndex="0"
                />
              </div>
            </div>
            <button type="submit" className="ui button" role="button" onClick = {() => register ? this.register() : this.login()}>
              Submit
            </button>
          </form>
        )}
        { !register && (
          <div className="login-form">
            {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
            <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
            <Grid
              textAlign="center"
              style={{ height: '100%' }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="red" textAlign="center">
                   Log-in to Studio Manager
                </Header>
                <Form size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      type="text"
                      name="username"
                      placeholder="username"
                      value={username}
                      onChange={e => this.onChange(e)}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      placeholder="password"
                      name="password"
                      value={password}
                      onChange={e => this.onChange(e)}
                    />

                    <Button
                      color="red"
                      fluid
                      size="large"
                      onClick={() =>
                        register ? this.register() : this.login()
                      }
                    >
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us?{' '}
                  <button onClick={() => this.displayRegister()}>
                    Register
                  </button>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}
