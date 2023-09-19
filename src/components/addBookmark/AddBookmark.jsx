import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useUrlLocation from "../../hooks/useUrlLocation";

const BASE_GEOLOCATION_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

const initialState = {
  data: {},
  loading: false,
  error: null,
};
const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { data: {}, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "FETCH_FAILURE":
      return { data: {}, loading: false, error: action.payload };
    case "ON_CHANGE": {
      console.log(action.payload);
      return {
        ...state,
        data: { ...state.data, [action.fieldName]: action.payload },
      };
    }
    default:
      return state;
  }
};

const AddBookmark = () => {
  const [lat, lng] = useUrlLocation();
  const [{ loading, error, data }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    if (!lat || !lng) return;
    async function getLocationData() {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `${BASE_GEOLOCATION_URL}latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "selected area is not a city ,please select somewhere else "
          );
        const bookmark = {
          cityName: data.city,
          country: data.countryName,
          countryCode: data.countryCode,
        };
        dispatch({ type: "FETCH_SUCCESS", payload: bookmark });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    }
    getLocationData();
  }, [lat, lng]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h2>Add bookmark : </h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName:</label>
          <input
            name="cityName"
            id="cityName"
            value={data?.cityName}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                fieldName: "cityName",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">country:</label>
          <input
            name="country"
            id="country"
            value={data?.country}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                fieldName: "country",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="buttons">
          <button className="btn btn--back">&larr; back</button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddBookmark;
