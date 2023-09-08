import { useReducer } from "react";
import apiClient from "../utils/apiClient";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { data: [], loading: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "FETCH_FAILURE":
      return { data: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function useFetch() {
  const [data, dispatch] = useReducer(fetchReducer, initialState);

  async function performAction(option) {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const response = await apiClient(option);
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE", payload: error.message });
    }
  }

  return [data, performAction];
}
