import React, { Component } from 'react';
import Post from './post_meeting';
import Delete from './delete_meeting'

export default class Meeting extends Component {
  state = {
    meeting_list: [],
    person: '',
    place: '',
    time: '',
    description: '',
    studio_manager: this.props.studio_manager,
  };

  onChangeDate = date => this.setState({ time: date });

  componentDidMount() {
    fetch(`http://127.0.0.1:8000/meeting/`)
      .then(r => {
        return r.json();
      })
      .then(meeting_list => {
        console.log('meetings', meeting_list);
        this.setState({ meeting_list });
      })
      .catch(err => {
        console.log('something terrible has happened to the fetch');
      });
  }

  deleteMeeting = function(id) {
    const array = this.state.meeting_list;
    const index = array.findIndex(item => item.id === parseInt(id, 10));
    console.log(index);
    array.splice(index, 1);
    this.setState({ meeting_list: array });
  }.bind(this);

  postMeeting = function(response) {
    const newArray = this.state.meeting_list;
    newArray.push(response);
    response.preventDefault();
    this.setState({
      meeting_list: newArray,
      person: '',
      place: '',
      time: '',
      description: '',
      studio_manager: this.props.studio_manager,
    });
  };

  createMeeting = function(evt) {
    // const {first_name = "", last_name, email, phone, desc, studio_manager} = this.state
    const authKey = this.props.token;

    return fetch(`http://127.0.0.1:8000/meeting/`, {
      method: 'POST',
      body: JSON.stringify({
        studio_manager: this.props.studio_manager,
        person: this.state.person,
        place: this.state.place,
        time: this.state.time,
        description: this.state.description,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authKey}`,
      },
    })
      .then(response => response.json())
      .then(response => this.postMeeting(response))
      .then(() => {
        this.setState({
          person: '',
          place: '',
          time: '',
          description: '',
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
      <div>
        {this.state.meeting_list.map(m => {
          return (
            <div className="ui error message" key={m.id}>
              <div className="content">
                <div className="header">
                  {m.person}
                </div>
                <ul className="list">
                  <li className="content">
                    {m.place}
                  </li>
                  <li className="content">{m.time}</li>
                  <li className="content">{m.description}</li>
                </ul>
              </div>
              <Delete
              state={this.state}
              id={m.id}
              deleteMeeting={this.deleteMeeting}
              token={this.props.token}
              />
            </div>
          );
        })}
        <Post
          state={this.state}
          handleFieldChange={this.handleFieldChange}
          createMeeting={this.createMeeting}
          onChangeDate={this.onChangeDate}
        />
      </div>
    );
  }
}
