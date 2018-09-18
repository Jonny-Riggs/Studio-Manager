import React, { Component } from 'react';
import Contact from './contact';

export default class Delete extends Component {

    deleteContact = function(event) {
    const authKey = this.props.token
    const id = event.target.id.split('__')[1];
    console.log(id)
    fetch(`http://127.0.0.1:8000/contact/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${authKey}`
      },
    }).then(() => {this.props.deleteContact(id)})
  }.bind(this)

  render() {
    return (
      <div>
        <button className="fluid ui icon button"
        id={'delete__' + this.props.id}
        onClick={this.deleteContact}
        >
          <i className="delete icon" />
        </button>
      </div>
    );
  }
}
