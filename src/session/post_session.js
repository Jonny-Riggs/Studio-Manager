import React, { Component } from 'react';
import Calendar from 'react-calendar';

export default class Post extends Component {
  render() {
    return (
      <div>
        <div className="ui inverted segment">
          <form className="ui inverted form">
            <div className="equal width fields">
              <div className="field">
                <label>Artist</label>
                <div className="ui fluid input">
                  <input
                    type="text"
                    placeholder="Artist"
                    onChange={this.props.handleFieldChange}
                    id="artist"
                  />
                </div>
              </div>
              <div className="field">
                <label>Genre</label>
                <div className="ui fluid input">
                  <input
                    type="text"
                    placeholder="Genre"
                    onChange={this.props.handleFieldChange}
                    id="genre"
                  />
                </div>
              </div>
              <div className="field">
                <label>Cost</label>
                <div className="ui fluid input">
                  <input
                    type="text"
                    placeholder="Cost"
                    onChange={this.props.handleFieldChange}
                    id="cost"
                  />
                </div>
              </div>
            </div>
              <div>
            <Calendar
              onChange={this.props.onChangeReservation}
              value={this.props.reservation}
            />
              </div>
            <button
              type="submit"
              className="ui right floated button"
              onClick={this.props.createSession}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
