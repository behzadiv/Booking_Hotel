import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../context/BookmarksContext";

const BookmarkDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    singleBookmarkLoading: loading,
    currentBookmark,
    getSingleBookmark,
  } = useBookmarks();

  useEffect(() => {
    getSingleBookmark(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h2>{currentBookmark.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
        <span>{currentBookmark.country}</span>
      </div>
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
    </div>
  );
};

export default BookmarkDetail;
