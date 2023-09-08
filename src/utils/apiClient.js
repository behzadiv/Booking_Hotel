import axios from "axios";

export default function apiClient(option) {
  const makingUrl = (url) => {
    return import.meta.env.VITE_BASE_URL + url;
  };
  return axios({ url: makingUrl(option.url), method: option.method });
}
