import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCity } from '../../services/location.actions';
import weatherImg from './sun_cloud.svg';

class CityWeather extends Component {
  componentDidMount() {
    const { city, failure, loading, weatherData, loadCityData } = this.props;
    if (!failure && !loading && !weatherData) {
      loadCityData(city);
    }
  }
  render() {
    const { cityName, weatherData, failure, expanded } = this.props;
    console.log(weatherData)
    return (
      <div>
        <div className="cardWrapper">
          <div className="card">
            <div className="card-header">
              <h4 className="addMargin">{cityName}</h4>
            </div>
            <div className="card-body">
              {failure && <h4>Failed to load data</h4>}
              {weatherData && weatherData.main ? (
                <React.Fragment>
                  <div className="temprature">
                    <div className="widgetCol">
                      <h3 className="tempratureBig">
                        {parseInt(weatherData.main.temp)}&#176;
                      </h3>
                    </div>
                    <div className="widgetCol">
                      <img src={weatherImg} className="imgWht" />
                    </div>
                  </div>
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
                </React.Fragment>
              ) : (
                <h4>Loading</h4>
              )}
            </div>
          </div>
        </div>
        {expanded && weatherData &&
          <React.Fragment>
          <div className="cardWrapper">
            <div className="card">
              <div className="row detailExpanded">
                <div>
                  <b>Time:</b><br />
                  {getTheTime()}
                </div>
                <div>
                  <b>Event:</b><br />
                  {weatherData.weather[0].main}
                </div>
                <div>
                  <b>Precip:</b><br /> 100%
                </div>
                <div>
                  <b>Humidity:</b><br />
                  {parseInt(weatherData.main.humidity)}&deg;
                </div>
                <div>
                  <b>Wind:</b><br />
                  {parseInt(weatherData.wind.deg)}&deg;
                </div>
              </div>
            </div>
          </div>
          </React.Fragment>
        }
      </div>
    );
  };
};

CityWeather.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function getTheTime() {
  let d = new Date();
  return d.toLocaleTimeString();
}

function mapStateToProps(state, props) {
  return state.locations.find(cityObj => cityObj.city === props.cityName);
}

function mapDispatchToProps(dispatch) {
  return {
    loadCityData: cityName => dispatch(loadCity(cityName))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityWeather);
