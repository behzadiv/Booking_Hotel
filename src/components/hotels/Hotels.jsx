import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;
  const [{ data, loading }, doFetch] = useFetch();
  useEffect(() => {
    doFetch({
      url: "/hotels",
      query: `?q=${destination}&accommodates_gte=${room}`,
      method: "GET",
    });
  }, [searchParams]);

  if (loading) return <p>loading...</p>;
  if (!data.length) return <p>Not found...</p>;
  return (
    <div className="searchList">
      <h2>Search Results({data.length})</h2>
      {data.map((item) => {
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
                <p className="price">
                  € &nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
