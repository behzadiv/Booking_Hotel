import { Outlet } from "react-router-dom";
import HotelsProvider, { useHotels } from "../context/HotelsContext";
import Map from "../Map";

const AppLayout = () => {
  const { hotels } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map locations={hotels} />
    </div>
  );
};

export default AppLayout;
