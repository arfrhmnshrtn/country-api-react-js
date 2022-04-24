import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Contains from "./pages/Contains";
import { Routes, Route } from "react-router-dom";
import ContainsDetail from "./pages/ContainsDetail";
import FilterByRegion from "./pages/FilterByRegion";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Contains />} />
        <Route path="detail/:slug" element={<ContainsDetail />} />
        <Route path=":slug" element={<FilterByRegion />} />
      </Routes>
    </div>
  );
}

export default App;
