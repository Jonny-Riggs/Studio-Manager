import React, { Component } from 'react';

export default class Post extends Component {


  render() {
    return (
      <div className="ui inverted segment">
        <form className="ui inverted form">
        <div className="field">
          <label>First Name</label>
          <input
          type="text"
          name="first-name"
          placeholder="First Name"
          onChange={this.props.handleFieldChange}
          // value={this.props.first_name}
          id="first_name"
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
          type="text"
          name="last-name"
          placeholder="Last Name"
          onChange={this.props.handleFieldChange}
          // value={this.props.last_name}
          id="last_name"
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={this.props.handleFieldChange}
          // value={this.props.email}
          id="email"
          />
        </div>
        <div className="field">
          <label>Phone</label>
          <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={this.props.handleFieldChange}
          // value={this.props.phone}
          id="phone"
          />
        </div>
        <div className="field">
          <label>Description</label>
          <input
          type="text"
          name="desc"
          placeholder="Description"
          onChange={this.props.handleFieldChange}
          // value={this.props.desc}
          id="desc"
          />
        </div>
        <input className="ui button" value="submit" type="button" onClick={this.props.createContact}/>
      </form>
      </div>
    );
  }
}
