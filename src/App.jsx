import Header from "./components/header/Header";
import "./App.css";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/appLayout/AppLayout";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<div>searched hotels list</div>} />
          <Route path=":id" element={<div>single hotel</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
