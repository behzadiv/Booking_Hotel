import Header from "./components/header/Header";
import "./App.css";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/appLayout/AppLayout";
import Hotels from "./components/hotels/Hotels";
import HotelsProvider from "./components/context/HotelsContext";

function App() {
  return (
    <HotelsProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<div>single hotel</div>} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
