import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CityWeather from "../CityWeather/CityWeather";
import { loadCityForcast } from "../../services/location.actions";

const DetailView = ({ match, loadCityForcastData, forcastData, failure }) => {
  const city = match.params.city;
  useEffect(() => {
    if (city) {
      loadCityForcastData(city);
    }
  }, [city, loadCityForcastData]);
  return (
    <div>
      <div className="row spaceEven">
        <h2>Weather Details</h2>
        <span className="navBar">
          <Link to={`/FiveDayForecast/${city}`} className="navElement">
            Five Day Forecast
          </Link>
        </span>
      </div>
      <div className="row">
        <div className="col">
          <CityWeather city={city} expanded={true} />
        </div>
        <div className="col">
          <div id="weatherDetails">
            <ul className="weatherDataLabel">
              <li>
                <strong>Time</strong>
              </li>
              <li>
                <strong>Temp</strong>
              </li>
              <li>
                <strong>Event</strong>
              </li>
              <li>
                <strong>Humidity</strong>
              </li>
              <li>
                <strong>Wind</strong>
              </li>
            </ul>
            {failure && <h4>Failed to load data</h4>}
            {forcastData && forcastData.list ? (
              forcastData.list.slice(0, 5).map(item => (
                <React.Fragment key={item.dt}>
                  <ul
                    className="weatherDataContainer"
                    style={{
                      backgroundColor: item.tempColor
                    }}
                  >
                    <li>{getTheTime(item.dt_txt)}</li>
                    <li>{Math.round(item.main.temp)}&deg;</li>
                    <li>{item.weather[0].main}</li>
                    <li>{parseInt(item.main.humidity)}%</li>
                    <li>{parseInt(item.wind.speed)} mph</li>
                  </ul>
                </React.Fragment>
              ))
            ) : (
              <h4>Loading</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function getTheTime(date) {
  let d = new Date(date);
  return d.toLocaleTimeString();
}

function mapStateToProps(state, props) {
  return state.locations.find(
    cityObj => cityObj.city === props.match.params.city
  );
}

function mapDispatchToProps(dispatch) {
  return {
    loadCityForcastData: city => dispatch(loadCityForcast(city))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
