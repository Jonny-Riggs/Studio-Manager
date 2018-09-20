import React, { Component } from 'react';
import Calendar from 'react-calendar';


export default class Post extends Component {
    render() {
        return(
            <div>
        <div className="ui inverted segment">
          <form className="ui inverted form">
            <div className="equal width fields">
              <div>
                <Calendar onChange={this.props.onChangeDate} value={this.props.time} />
              </div>
              <div className="field">
                <label>Person</label>
                <div className="ui fluid input">
                  <input
                  type="text"
                   placeholder="Person"
                   onChange={this.props.handleFieldChange}
                   id="person"
                   />
                </div>
              </div>
              <div className="field">
                <label>Place</label>
                <div className="ui fluid input">
                  <input
                  type="text"
                  placeholder="Place"
                  onChange={this.props.handleFieldChange}
                  id="place"
                  />
                </div>
              </div>
              <div className="field">
                <label>Description</label>
                <input
                rows="3"
                onChange={this.props.handleFieldChange}
                placeholder="Description"
                id="description"
                />
              </div>
            </div>
            <button type="submit" className="ui right floated button" onClick={this.props.createMeeting}>
              Submit
            </button>
          </form>
        </div>
      </div>
        )
    }
}