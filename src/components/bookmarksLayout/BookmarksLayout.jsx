import { Outlet } from "react-router-dom";
import { useBookmarks } from "../context/BookmarksContext";
import Map from "../Map";

const BookmarksLayout = () => {
  const { loading, bookmarks } = useBookmarks();
  
  if (loading) return <p>Loading...</p>;
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markersLocation={bookmarks} />
    </div>
  );
};

export default BookmarksLayout;
