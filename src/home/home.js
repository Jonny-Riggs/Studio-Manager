import React, { Component } from 'react';

export default class Home extends Component {

    state = {
        manager_list: [],
        contact_list: [],
        gear_list: [],
        meeting_list: [],
        session_list: [],
    }


  render() {
    return (
      <div>
        <div className="pusher">
          <div className="ui inverted vertical masthead center aligned segment">
            <div className="ui container">
            </div>

            <div className="ui text container">
              <h1 className="ui inverted header">Welcom to Studio Manager</h1>
            </div>
          </div>

          <div className="ui vertical stripe segment">
            <div className="ui text container">
              <h3 className="ui header">Helping Engineers organize their day to day tasks!</h3>
              <p>
                The Studio Manager App gives managers the capability to organize
                and keep up with day to day operations in the studio. Be sure to
                register and utilize the many useful components available!
              </p>
              <h4 className="ui horizontal header divider">
                <a href="">-</a>
              </h4>
              <h3 className="ui header">About the App!</h3>
              <p>
                Once registered and logged in, each manager will be able to save
                and look up information that's pertinent to their every day needs.
              </p>
            </div>
          </div>

          <div className="ui inverted vertical footer segment">
            <div className="ui container">
              <div className="ui stackable inverted divided equal height stackable grid">
                <div className="three wide column">
                  <div className="ui inverted link list">
                  </div>
                </div>
                <div className="three wide column">
                  <div className="ui inverted link list">
                  </div>
                </div>
                <div className="seven wide column">
                  <h4 className="ui inverted header">Designed by Jonathan Riggs</h4>
                  <p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        >
      </div>
    );
  }
}
