import React, { Component } from "react";
import { connect } from "react-redux";
import { addCity } from "../../services/location.actions";

class AddCityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue !== "") {
      this.props.addCity(this.state.inputValue);
      this.setState({ inputValue: "" });
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div>
        <form id="addCity" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="_addCity"
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Enter City"
          ></input>
          <input className="submit" type="submit" value="GO"></input>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCity: cityName => dispatch(addCity(cityName))
  };
}

export default connect(null, mapDispatchToProps)(AddCityForm);
