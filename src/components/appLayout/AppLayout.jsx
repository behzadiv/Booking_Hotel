import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="map">map</div>
    </div>
  );
};

export default AppLayout;
