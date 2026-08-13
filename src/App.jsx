import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import AddLostItem from "./pages/AddLostItem";
import AddFoundItem from "./pages/AddFoundItem";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main>
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Lost Items */}
          <Route
            path="/lost-items"
            element={<LostItems />}
          />

          {/* Found Items */}
          <Route
            path="/found-items"
            element={<FoundItems />}
          />

          {/* Add Lost Item */}
          <Route
            path="/add-lost-item"
            element={<AddLostItem />}
          />

          {/* Add Found Item */}
          <Route
            path="/add-found-item"
            element={<AddFoundItem />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;