import React, { Component } from 'react';

export default class Delete extends Component {

    deleteMeeting = function(event) {
    const authKey = this.props.token
    const id = event.target.id.split('__')[1];
    console.log(id)
    fetch(`http://127.0.0.1:8000/meeting/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${authKey}`
      },
    }).then(() => {this.props.deleteMeeting(id)})
  }.bind(this)

  render() {
    return (
      <div>
        <button className="ui right floated red button"
        id={'delete__' + this.props.id}
        onClick={this.deleteMeeting}
        >
          <i className="delete icon" />
        </button>
      </div>
    );
  }
}