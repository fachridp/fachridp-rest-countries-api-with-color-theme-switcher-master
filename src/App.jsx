import { Routes, Route } from "react-router-dom";

// Import My Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import BorderCountryDetail from "./pages/BorderCountryDetail";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/detail/:id" Component={Detail} />
        <Route path="/detail/:id/border-country/:borderName" Component={BorderCountryDetail} />
      </Routes>
    </>
  )
}