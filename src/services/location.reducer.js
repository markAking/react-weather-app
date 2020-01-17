import {
  ADD_CITY,
  REMOVE_CITY,
  LOAD_CITY_FAILURE,
  LOAD_CITY_IN_PROGRESS,
  LOAD_CITY_WEATHER_SUCCESS,
  LOAD_CITY_FORCAST_SUCCESS
} from "./action.types";

export default function locationReducer(
  state = [{ city: "New York" }],
  action
) {
  switch (action.type) {
    case ADD_CITY:
      const newCity = {
        city: action.city
      };
      return [...state, newCity];

    case REMOVE_CITY:
      const cities = state.filter(cityObj => {
        return cityObj.city !== action.city;
      });
      return [...cities];

    case LOAD_CITY_WEATHER_SUCCESS:
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          setTempColor(action.weatherData);
          return {
            ...cityObj,
            failure: false,
            loading: false,
            weatherData: action.weatherData
          };
        }
        return cityObj;
      });

    case LOAD_CITY_FORCAST_SUCCESS:
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          action.forcastData.list.forEach(element => {
            setTempColor(element);
          });
          return {
            ...cityObj,
            failure: false,
            loading: false,
            forcastData: action.forcastData
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
            error: action.error
          };
        }
        return cityObj;
      });

    case LOAD_CITY_IN_PROGRESS:
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          return {
            ...cityObj,
            loading: true
          };
        }
        return cityObj;
      });

    default:
      return state;
  }
}

function setTempColor(data) {
  let temp = Math.round(data.main.temp);
  temp = temp > 100 ? 100 : temp < 0 ? 0 : temp;
  const hue = Math.round(280 - 280 * (temp / 100));
  data.tempColor = `hsl(${hue}, 100%, 40%)`;
}
