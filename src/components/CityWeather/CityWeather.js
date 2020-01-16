import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { loadCityWeather } from "../../services/location.actions";

class CityWeather extends Component {
  componentDidMount() {
    const { city, failure, loading, weatherData, loadCityData } = this.props;
    if (!failure && !loading && !weatherData) {
      loadCityData(city);
    }
  }
  render() {
    const {
      city,
      weatherData,
      failure,
      expanded,
      error,
      removeCity
    } = this.props;
    return (
      <div>
        <div className="cardWrapper">
          <div className="card">
            <div className="card-header">
              {!failure && !expanded ? (
                <React.Fragment>
                  <Link to={`/DetailView/${city}`}>
                    <h4 className="addMargin">{city}</h4>
                  </Link>
                  <button
                    onClick={() => {
                      removeCity(city);
                    }}
                    className="removeStyle"
                  >
                    <FontAwesome className="icon" name="times-circle" />
                  </button>
                </React.Fragment>
              ) : !expanded ? (
                <React.Fragment>
                  <h4 className="addMargin">{city}</h4>
                  <button
                    onClick={() => {
                      removeCity(city);
                    }}
                    className="removeStyle"
                  >
                    <FontAwesome className="icon" name="times-circle" />
                  </button>
                </React.Fragment>
              ) : (
                <h4 className="addMargin">{city}</h4>
              )}
            </div>
            <div
              className="card-body"
              style={{
                backgroundColor:
                  weatherData && weatherData.main
                    ? weatherData.tempColor
                    : "initial"
              }}
            >
              {failure && (
                <div className="temprature">
                  <h4>{error}</h4>
                </div>
              )}
              {weatherData && weatherData.main ? (
                <React.Fragment>
                  <div className="temprature">
                    <h3>{parseInt(weatherData.main.temp)}&#176;</h3>
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt=""
                    />
                    <div className="widgetColRight">
                      <div className="dayblock">
                        Low: {parseInt(weatherData.main.temp_min)}&#176;
                      </div>
                      <div className="dayblock">
                        High: {parseInt(weatherData.main.temp_max)}&#176;
                      </div>
                      <div className="dayblockLast">
                        Humidity: {`${weatherData.main.humidity}%`}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                !failure && <h4>Loading</h4>
              )}
            </div>
          </div>
        </div>
        {expanded && weatherData && (
          <React.Fragment>
            <div className="cardWrapper">
              <div className="card">
                <div className="card-body">
                  <ul>
                    <li>
                      <strong>Time: </strong>
                      {getTheTime(weatherData.dt)}
                    </li>
                    <li>
                      <strong>Event: </strong>
                      {weatherData.weather[0].main}
                    </li>
                    <li>
                      <strong>Precip: </strong>
                      100%
                    </li>
                    <li>
                      <strong>Humidity: </strong>
                      {parseInt(weatherData.main.humidity)}%;
                    </li>
                    <li>
                      <strong>Wind: </strong>
                      {parseInt(weatherData.wind.speed)} mph
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

CityWeather.propTypes = {
  city: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  failure: PropTypes.bool.isRequired,
  weatherData: PropTypes.shape()
};

CityWeather.defaultProps = {
  cityName: "",
  loading: false,
  failure: false,
  weatherData: null
};

function getTheTime(date) {
  let d = new Date();
  return d.toLocaleTimeString();
}

function mapStateToProps(state, props) {
  return state.locations.find(cityObj => cityObj.city === props.city);
}

function mapDispatchToProps(dispatch) {
  return {
    loadCityData: city => dispatch(loadCityWeather(city))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityWeather);
