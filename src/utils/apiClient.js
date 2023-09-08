import axios from "axios";

export default function apiClient(option) {
  const makingUrl = (option) => {
    return `${import.meta.env.VITE_BASE_URL}${option.url}${option.query||""}`;
  };
  return axios({ url: makingUrl(option), method: option.method });
}
