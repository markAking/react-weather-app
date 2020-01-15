import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AddCityForm from '../AddCityForm/AddCityForm';
import CityWeather from '../CityWeather/CityWeather';

const HomePage = ({ cities }) => (
  <div>
    <div className="row spaceEven">
      <h2>Overview - Weather Widget</h2>
      <AddCityForm />
    </div>
    <div className="row">
    </div>
    <div className="row weatherList">
      {cities.map(({ city }) => (
        <React.Fragment key={city}>
          <Link to={`/DetailView/${city}`}>
            <CityWeather cityName={city} /> 
          </Link>
        </React.Fragment>
      ))}
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    cities: state.locations,
  };
}

export default connect(
  mapStateToProps,
  null
)(HomePage);
