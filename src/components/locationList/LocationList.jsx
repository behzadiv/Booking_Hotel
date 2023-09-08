import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const LocationList = () => {
  const [{ data, loading }, fetchData] = useFetch();
  useEffect(() => {
    fetchData({ url: "/hotels" });
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="nearbyLocation">
      <h2>NearBy Location</h2>
      <div className="locationList">
        {data.map((item) => {
          return <LocationListItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default LocationList;

const LocationListItem = ({ item }) => {
  return (
    <div className="locationItem">
      <img src={item.picture_url.url} alt={item.name} />
      <div className="locationItemDesc">
        <p>{item.smart_location}</p>
        <p className="name">{item.name}</p>
        <p className="price">
          € &nbsp;{item.price}&nbsp;
          <span>night</span>
        </p>
      </div>
    </div>
  );
};
