import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCity } from '../../services/location.actions';

class DetailExpanded extends Component {
  componentDidMount() {
    const { city, failure, loading, weatherData, loadCityData } = this.props;
    if (!failure && !loading && !weatherData) {
      loadCityData(city);
    }
  }
  render() {
    const { cityName, weatherData, failure } = this.props;
    return (
      <div className="cardWrapper">
        <div className="card">
          <div className="row detailExpanded">
            {failure && <h4>Failed to load data</h4>}
            {weatherData && weatherData.main ? (
              <React.Fragment>
                <div>
                  <b>Time:</b><br />10:12 am
                </div>
                <div>
                  <b>Event:</b><br />
                  {weatherData.weather.main}
                </div>
                <div>
                  <b>Precip:</b><br /> 100%
                </div>
                <div>
                  <b>Humidity:</b><br /> 56&deg;
                </div>
                <div>
                  <b>Wind:</b><br /> 56&deg;
                </div>
              </React.Fragment>
            ) : (
              <h4>Loading</h4>
            )}
          </div>
        </div>
      </div>
    );
  };
};

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
  null
)(DetailExpanded);
