import Header from "./components/header/Header";
import "./App.css";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/appLayout/AppLayout";
import Hotels from "./components/hotels/Hotels";
import HotelsProvider from "./components/context/HotelsContext";
import HotelDetails from "./components/hotelDetails/HotelDetails";
import BookmarksLayout from "./components/bookmarksLayout/BookmarksLayout";
import Bookmarks from "./components/bookmarks/Bookmarks";

function App() {
  return (
    <HotelsProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<HotelDetails />} />
        </Route>
        <Route path="/bookmarks" element={<BookmarksLayout />}>
          <Route index element={<Bookmarks />} />
          <Route path="add" element={<div>add</div>} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
