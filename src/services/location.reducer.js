import {
  ADD_CITY,
  LOAD_CITY_FAILURE,
  LOAD_CITY_IN_PROGRESS,
  LOAD_CITY_SUCCESS,
} from './action.types';

export default function locationReducer(
  state = [ { city: 'New York' } ],
  action
) {
  switch (action.type) {
    case ADD_CITY:
      const newCity = {
        city: action.city,
      };
      return [...state, newCity];

    case LOAD_CITY_SUCCESS:
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          return {
            ...cityObj,
            failure: false,
            loading: false,
            weatherData: action.weatherData,
          };
        }
        return cityObj;
      });

    case LOAD_CITY_FAILURE:
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          return {
            ...cityObj,
            failure: true,
            loading: false,
            error: action.error,
          };
        }
        return cityObj;
      });

    case LOAD_CITY_IN_PROGRESS:
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          return {
            ...cityObj,
            loading: true,
          };
        }
        return cityObj;
      });

    default:
      return state;
  }
}
