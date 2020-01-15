import { getWeatherForCity } from '../api/OpenWeatherMapAPI';

import {
  ADD_CITY,
  LOAD_CITY_FAILURE,
  LOAD_CITY_IN_PROGRESS,
  LOAD_CITY_SUCCESS,
} from './action.types';

export const addCity = city => ({ type: ADD_CITY, city });

export const loadCityFailure = (city, error) => ({
  type: LOAD_CITY_FAILURE,
  city,
  error,
});

export const loadCityInProgress = city => ({
  type: LOAD_CITY_IN_PROGRESS,
  city,
});

export const loadCitySuccess = (city, weatherData) => ({
  type: LOAD_CITY_SUCCESS,
  city,
  weatherData,
});

export const loadCity = city => {
  return dispatch => {
    dispatch(loadCityInProgress(city));

    return getWeatherForCity(city)
      .then(weatherData => {
        dispatch(loadCitySuccess(city, weatherData));
      })
      .catch(error => {
        console.log({ error });
        dispatch(loadCityFailure(city, error.message));
      });
  };
};
