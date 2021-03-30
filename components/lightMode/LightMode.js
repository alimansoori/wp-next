import React, { Component } from "react";
import Switch from "react-switch";

export default class LightMode extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div className="landing-header__light-mode">
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          onColor="#0072bb"
          width={100}
          height={40}
          uncheckedIcon={false}
          checkedIcon={
            <img
              className="landing-header__light-mode__icon"
              src={`/image/icon/DAY.svg`}
              alt="credit"
            />
          }
        />
      </div>
    );
  }
}
