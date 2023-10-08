import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { useBookmarks } from "../context/BookmarksContext";
import { HiTrash } from "react-icons/hi";

const Bookmarks = () => {
  const { bookmarks, loading, currentBookmark, deleteBookmark } =
    useBookmarks();

  if (loading) return <p>Loading...</p>;
  if(!bookmarks.length) return <p>There is no Bookmark</p>
  
  return (
    <>
      <h2>Bookmarks List : </h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              to={`/bookmarks/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              key={item.id}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<strong>{item.cityName}</strong>&nbsp;
                  <span>{item.country}</span>
                </div>
                <button>
                  <HiTrash
                    className="trash"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteBookmark(item.id);
                    }}
                  />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Bookmarks;
