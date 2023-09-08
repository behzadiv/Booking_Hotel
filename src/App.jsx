import Header from "./components/header/Header";
import "./App.css";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
    </>
  );
}

export default App;
