import React from "react";
import { connect } from "react-redux";

import AddCityForm from "../AddCityForm/AddCityForm";
import CityWeather from "../CityWeather/CityWeather";
import { removeCity } from "../../services/location.actions";

const HomePage = ({ cities, removeCityAction }) => {
  return (
    <div>
      <div className="row spaceEven">
        <h2>Overview - Weather Widget</h2>
        <AddCityForm />
      </div>
      <div className="row"></div>
      <div className="row weatherList">
        {cities.map(({ city }) => (
          <React.Fragment key={city}>
            <CityWeather city={city} removeCity={removeCityAction} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    cities: state.locations
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCityAction: city => dispatch(removeCity(city))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
