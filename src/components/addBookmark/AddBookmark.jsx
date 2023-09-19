import axios from "axios";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useUrlLocation from "../../hooks/useUrlLocation";

const BASE_GEOLOCATION_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

const AddBookmark = () => {
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    async function getLocationData() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOLOCATION_URL}latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "selected area is not a city ,please select somewhere else "
          );
        setCityName(data.city);
        setCountry(data.countryName);
        setcountryCode(data.countryCode);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">country:</label>
          <input
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--back">&larr; back</button>
          <button className="btn btn--primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookmark;
