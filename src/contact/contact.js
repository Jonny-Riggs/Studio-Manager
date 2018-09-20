import React, { Component } from 'react';
import Post from './post_contact';
import Delete from './delete_contact';

export default class Contact extends Component {
  state = {
    contact_list: [],
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    desc: '',
    studio_manager: this.props.studio_manager,
  };

  componentDidMount() {
    fetch(`http://127.0.0.1:8000/contact/`)
      .then(r => {
        return r.json();
      })
      .then(contact_list => {
        console.log('contacts', contact_list);
        this.setState({ contact_list });
      })
      .catch(err => {
        console.log('something terrible has happened to the fetch');
      });
  }

  deleteContact = function(id) {
    const array = this.state.contact_list;
    const index = array.findIndex(item => item.id === parseInt(id, 10));
    console.log(index);
    array.splice(index, 1);
    this.setState({ contact_list: array });
  }.bind(this);

  postContact = function(response) {
    const newArray = this.state.contact_list;
    newArray.push(response);
    this.setState({
      contact_list: newArray,
      studio_manager: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      desc: '',
    });
  }.bind(this)

  createContact = function(evt) {
    const authKey = this.props.token;

    return fetch(`http://127.0.0.1:8000/contact/`, {
      method: 'POST',
      body: JSON.stringify({
        studio_manager: this.props.studio_manager,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone: this.state.phone,
        desc: this.state.desc,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authKey}`,
      },
    })
      .then(response => response.json())
      .then(response => this.postContact(response))
      .then(() => {
        this.setState({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          desc: '',
        });
      });
  }.bind(this);

  handleFieldChange = function(evt) {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }.bind(this);

  render() {
    return (
      <div className="ui equal width center aligned padded grid">
        {this.state.contact_list.map(e => {
          return (
            <div key={e.id}>
              <div className="black column">
                <div className="ui raised segment">
                  <a className="ui red ribbon label">Contact Name</a>
                  <span>
                    {e.first_name} {e.last_name}
                  </span>
                  <p />
                  <a className="ui red ribbon label">Email</a>
                  {e.email}
                  <p />
                  <a className="ui red ribbon label">Phone</a>
                  {e.phone}
                  <p />
                  <a className="ui red ribbon label">Notes</a>
                  {e.desc}
                  <p />
                  <Delete
                    state={this.state}
                    id={e.id}
                    deleteContact={this.deleteContact}
                    token={this.props.token}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="column">
          <Post
            state={this.state}
            handleFieldChange={this.handleFieldChange}
            createContact={this.createContact}
          />
        </div>
      </div>
    );
  }
}
