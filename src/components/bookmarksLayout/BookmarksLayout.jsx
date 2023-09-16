import { Outlet } from "react-router-dom";
import Map from "../Map";

const BookmarksLayout = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markersLocation={[]} />
    </div>
  );
};

export default BookmarksLayout;
