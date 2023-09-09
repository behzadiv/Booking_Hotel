import { useEffect, useReducer } from "react";

const geoLocationReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_GEOLOCATION":
      return { loading: true, data: {}, error: null };
    case "GEOLOCATION_SUCCESS":
      return { loading: false, data: action.payload, error: null };
    case "GEOLOCATION_FAILED":
      return { loading: false, data: {}, error: action.payload };

    default:
      return state;
  }
};

const useGeoLocation = () => {
  const [data, dispatch] = useReducer(geoLocationReducer, {
    loading: false,
    data: {},
    error: null,
  });

  const getPosition = () => {
    dispatch({ type: "REQUEST_GEOLOCATION" });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatch({
            type: "GEOLOCATION_SUCCESS",
            payload: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          });
        },
        (err) => {
          dispatch({ type: "GEOLOCATION_FAILED", payload: err.message });
        }
      );
    }
  };

  return [data, getPosition];
};

export default useGeoLocation;
