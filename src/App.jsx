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
import BookmarksProvider from "./components/context/BookmarksContext";
import BookmarkDetail from "./components/bookmarkDetails/BookmarkDetails";
import AddBookmark from "./components/addBookmark/AddBookmark";
import Login from "./components/login/Login";
import AuthProvider from "./components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <HotelsProvider>
        <BookmarksProvider>
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<HotelDetails />} />
            </Route>
            <Route path="/bookmarks" element={<BookmarksLayout />}>
              <Route index element={<Bookmarks />} />
              <Route path=":id" element={<BookmarkDetail />} />
              <Route path="add" element={<AddBookmark />} />
            </Route>
          </Routes>
        </BookmarksProvider>
      </HotelsProvider>
    </AuthProvider>
  );
}

export default App;
