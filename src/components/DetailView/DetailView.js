import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CityWeather from '../CityWeather/CityWeather';
import DetailExpanded from './DetailExpanded';

const DetailView = ({ match }) => {
  const city = match.params.cityName;
  console.log(match)
  return (
    <div>
      <div className="row spaceEven">
        <h2>Weather Details</h2>
        <span className="navBar">
          <Link to={`/fiveDayForecast/${city}`} className="navElement">Five Day Forecast</Link>
        </span>
      </div>
      <div className="row">
        <div className="col">
          <CityWeather cityName={city} expanded={true} />
        </div>
        <div className="col">
          {/* Component for Listing Encapsulate */}
          <div id="weatherDetails">
            <ul className="weatherDataLabel">
              <li>Time</li>
              <li>Event</li>
              <li>Precip</li>
              <li>Humidity</li>
              <li>Wind</li>
            </ul>
            {/* Iterate results for hourly results */}
            <ul className="weatherDataContainer">
              <li>11:00 am</li>
              <li>Cloudy</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
            </ul>
            <ul className="weatherDataContainer">
              <li>12:00 pm</li>
              <li>Cloudy Rains</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
            </ul>
            <ul className="weatherDataContainer">
              <li>1:00 pm</li>
              <li>Cloudy</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
            </ul>
            <ul className="weatherDataContainer">
              <li>2:00 pm</li>
              <li>Cloudy Winds</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, props) {
  return state.locations.find(cityObj => cityObj.city === props.cityName);
}

export default DetailView
