import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarksContext";

const Bookmarks = () => {
  const { bookmarks, loading } = useBookmarks();
  
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <h2>Bookmarks List : </h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <div className="bookmarkItem" key={item.id}>
              <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp;<strong>{item.cityName}</strong>&nbsp;
              <span>{item.country}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Bookmarks;
