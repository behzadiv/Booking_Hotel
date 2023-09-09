import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsContext";

const Hotels = () => {
  const {loading, hotels} = useHotels();

  if (loading) return <p>loading...</p>;
  if (!hotels.length) return <p>Not found...</p>;

  return (
    <div className="searchList">
      <h2>Search Results({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            key={item.id}
          >
            <div className="searchItem">
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p>{item.smart_location}</p>
                <p className="name">{item.name}</p>
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
