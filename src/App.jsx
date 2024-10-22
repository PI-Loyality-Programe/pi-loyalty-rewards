import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./Components/Write.css";

import NavPi from "./NavPi";
import Home from "./Components/Home";
import About from "./Components/AboutUs";
import AboutPiNetwork from "./Components/AboutPi";
import Programe from "./Components/ProgramePi";

import WalletSelection from "./Components/WalletSelection";

// Create a wrapper component to use the useLocation hook
function AppWrapper() {
  const location = useLocation(); // Get the current location

  return (
    <>
      <NavPi />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programe" element={<Programe />} />
        <Route path="/pi-network" element={<AboutPiNetwork />} />
      </Routes>
      {/* Render WalletSelection only on the Home page */}
      {location.pathname === "/" && <WalletSelection />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
