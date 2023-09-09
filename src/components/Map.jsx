import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import { useHotels } from "./context/HotelsContext";

const Map = () => {
  const [mapCenter, setMapCenter] = useState([52.36, 4.86]);
  const { hotels } = useHotels();
  const [{ loading, data: geoPosition }, getPosition] = useGeoLocation();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition.lat && geoPosition.lng) {
      setMapCenter([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.name}</Popup>
            </Marker>
          );
        })}
        <button className="getLocation" onClick={getPosition}>
          {loading ? "Loading..." : "Use Your Location"}
        </button>
      </MapContainer>
    </div>
  );
};

export default Map;

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
};
