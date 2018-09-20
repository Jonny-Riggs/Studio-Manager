import React, { Component } from 'react';
import Post from './post_session'
import Delete from './delete_session'
export default class Session extends Component {
  state = {
    session_list: [],
    artist: '',
    genre: '',
    reservation: '',
    cost: '',
    studio_manager: this.props.studio_manager,
  };

  onChangeReservation = date => this.setState({ reservation: date });

  componentDidMount() {
    fetch(`http://127.0.0.1:8000/session/`)
      .then(r => {
        return r.json();
      })
      .then(session_list => {
        console.log('sessions', session_list);
        this.setState({ session_list });
      })
      .catch(err => {
        console.log('something happened to the fetch');
      });
  }

  deleteSession = function(id) {
    const array = this.state.session_list;
    const index = array.findIndex(item => item.id === parseInt(id, 10));
    console.log(index);
    array.splice(index, 1);
    this.setState({ session_list: array });
  }.bind(this);

  postSession = function(response) {
    const newArray = this.state.session_list;
    newArray.push(response);
    this.setState({
      session_list: newArray,
      artist: '',
      genre: '',
      reservation: '',
      cost: '',
      studio_manager: this.props.studio_manager,
    });
  };

  createSession = function(evt) {
    const authKey = this.props.token;
    return fetch(`http://127.0.0.1:8000/session/`, {
      method: 'POST',
      body: JSON.stringify({
        studio_manager: this.props.studio_manager,
        artist: this.state.artist,
        genre: this.state.genre,
        reservation: this.state.reservation,
        cost: this.state.cost,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authKey}`,
      },
    })
      .then(response => response.json())
      .then(response => this.postSession(response))
      .then(() => {
        this.setState({
          artist: '',
          genre: '',
          reservation: '',
          cost: '',
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
          {this.state.session_list.map(s => {
              return (
        <div className="ui horizontal steps" key={s.id}>
          <div className="completed step">
            <div className="content">
              <div className="title">{s.artist}</div>
              <div className="description">Artist</div>
            </div>
          </div>
          <div className="completed step">
            <div className="content">
              <div className="title">{s.genre}</div>
              <div className="description">Genre</div>
            </div>
          </div>
          <div className="completed step">
            <div className="content">
              <div className="title">{s.reservation}</div>
              <div className="description">Reservation</div>
            </div>
          </div>
          <div className="completed step">
            <div className="content">
              <div className="title">{s.cost}</div>
              <div className="description">Session Cost</div>
            </div>
          </div>
          <Delete
              state={this.state}
              id={s.id}
              deleteSession={this.deleteSession}
              token={this.props.token}
              />
        </div>
              )
            })}
        <Post
          state={this.state}
          handleFieldChange={this.handleFieldChange}
          createSession={this.createSession}
          onChangeReservation={this.onChangeReservation}
        />
      </div>
    );
  }
}
