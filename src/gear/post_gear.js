import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    return (
      <div className="ui inverted segment">
      <div className="ui inverted form">
        <div className="fields">
          <div className="field">
            <label>Brand</label>
            <input type="text"
            placeholder="Brand"
            onChange={this.props.handleFieldChange}
            id="brand"
            />
          </div>
          <div className="field">
            <label>Model</label>
            <input type="text"
            placeholder="Model"
            onChange={this.props.handleFieldChange}
            id="model"
            />
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text"
            placeholder="Description"
            onChange={this.props.handleFieldChange}
            id="description"
            />
          </div>
          <div className="field">
            <label>Accessories</label>
            <input type="text"
            placeholder="Accessories"
            onChange={this.props.handleFieldChange}
            id="accessories"
            />
          </div>
          <div className="field">
            <label>Specs</label>
            <input type="text"
            placeholder="Specs"
            onChange={this.props.handleFieldChange}
            id="specs"
            />
          </div>
          <div className="field">
            <label>Image</label>
            <input type="text"
            placeholder="Image"
            onChange={this.props.handleFieldChange}
            id="image"
            />
          </div>
        <button className="ui red button" type="submit" onClick={this.props.createGear}>Add Gear</button>
        </div>
      </div>
      </div>
    );
  }
}
