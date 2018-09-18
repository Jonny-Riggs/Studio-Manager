import React, { Component } from 'react';
import Post from './post_gear';
import Delete from './delete_gear';

export default class Gear extends Component {
  state = {
    gear_list: [],
    brand: '',
    model: '',
    description: '',
    accessories: '',
    specs: '',
    image: '',
    studio_manager: this.props.studio_manager,
  };

  componentDidMount() {
    fetch(`http://127.0.0.1:8000/gear/`)
      .then(r => {
        return r.json();
      })
      .then(gear_list => {
        console.log('contacts', gear_list);
        this.setState({ gear_list });
      })
      .catch(err => {
        console.log('something terrible has happened to the fetch');
      });
  }

  deleteGear = function(id) {
    const array = this.state.gear_list;
    const index = array.findIndex(item => item.id === parseInt(id, 10));
    console.log(index);
    array.splice(index, 1);
    this.setState({ gear_list: array });
  }.bind(this);

  postGear = function(response) {
    const newArray = this.state.gear_list;
    newArray.push(response);
    response.preventDefault;
    this.setState({
      gear_list: newArray,
      brand: '',
      model: '',
      description: '',
      accessories: '',
      specs: '',
      image: '',
      studio_manager: this.props.studio_manager,
    });
  };

  createGear = function(evt) {
    // const {first_name = "", last_name, email, phone, desc, studio_manager} = this.state
    const authKey = this.props.token;

    return fetch(`http://127.0.0.1:8000/gear/`, {
      method: 'POST',
      body: JSON.stringify({
        studio_manager: this.props.studio_manager,
        brand: this.state.brand,
        model: this.state.model,
        description: this.state.description,
        accessories: this.state.accessories,
        specs: this.state.specs,
        image: this.state.image,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authKey}`,
      },
    })
      .then(response => response.json())
      .then(response => this.postGear(response))
      .then(() => {
        this.setState({
          brand: '',
          model: '',
          description: '',
          accessories: '',
          specs: '',
          image: '',
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
        {this.state.gear_list.map(e => {
          return (
            <div className="ui raised red card" key={e.id}>
              <div className="image">
                <img src={e.image} />
              </div>
              <div className="content">
                <a className="header">{e.brand}</a>
                <div className="meta">
                  <span className="date">{e.model}</span>
                </div>
                <div className="description">
                  {e.description} <br />
                  {e.specs}
                </div>
              </div>
              <div className="extra content">
                <a>
                  {e.accessories}
                </a>
              </div>
              <Delete
                 state={this.state}
                 id={e.id}
                 deleteGear={this.deleteGear}
                 token={this.props.token}
               />
            </div>
          );
        })}
        <Post
          state={this.state}
          handleFieldChange={this.handleFieldChange}
          createGear={this.createGear}
        />
      </div>
    );
  }
}
