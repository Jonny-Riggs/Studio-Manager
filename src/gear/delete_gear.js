import React, { Component } from 'react';

export default class Delete extends Component {

    deleteGear = function(event) {
    const authKey = this.props.token
    const id = event.target.id.split('__')[1];
    console.log(id)
    fetch(`http://127.0.0.1:8000/gear/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${authKey}`
      },
    }).then(() => {this.props.deleteGear(id)})
  }.bind(this)

  render() {
    return (
      <div>
        <button className="fluid ui icon red button"
        id={'delete__' + this.props.id}
        onClick={this.deleteGear}
        >
          <i className="delete icon" />
        </button>
      </div>
    );
  }
}
