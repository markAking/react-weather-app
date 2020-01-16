import { getWeatherForCity, getForcastForCity } from "../api/OpenWeatherMapAPI";

import {
  ADD_CITY,
  REMOVE_CITY,
  LOAD_CITY_FAILURE,
  LOAD_CITY_IN_PROGRESS,
  LOAD_CITY_WEATHER_SUCCESS,
  LOAD_CITY_FORCAST_SUCCESS
} from "./action.types";

export const addCity = city => ({ type: ADD_CITY, city });

export const removeCity = city => ({ type: REMOVE_CITY, city });

export const loadCityFailure = (city, error) => ({
  type: LOAD_CITY_FAILURE,
  city,
  error
});

export const loadCityInProgress = city => ({
  type: LOAD_CITY_IN_PROGRESS,
  city
});

export const loadCityWeatherSuccess = (city, weatherData) => ({
  type: LOAD_CITY_WEATHER_SUCCESS,
  city,
  weatherData
});

export const loadCityForcastSuccess = (city, forcastData) => ({
  type: LOAD_CITY_FORCAST_SUCCESS,
  city,
  forcastData
});

export const loadCityWeather = city => {
  return dispatch => {
    dispatch(loadCityInProgress(city));

    return getWeatherForCity(city)
      .then(weatherData => {
        dispatch(loadCityWeatherSuccess(city, weatherData));
      })
      .catch(error => {
        dispatch(loadCityFailure(city, error.message));
      });
  };
};

export const loadCityForcast = city => {
  return dispatch => {
    dispatch(loadCityInProgress(city));

    return getForcastForCity(city)
      .then(forcastData => {
        dispatch(loadCityForcastSuccess(city, forcastData));
      })
      .catch(error => {
        console.log({ error });
        dispatch(loadCityFailure(city, error.message));
      });
  };
};
