import { useHotels } from "./context/HotelsContext";

const Map = () => {
   const {hotels,loading}=useHotels()
    console.log(hotels);
    return ( 
        <div>
            mapsection
        </div>
     );
}
 
export default Map;