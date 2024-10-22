import { React } from "react";
import { Link } from "react-router-dom";

function NavPi() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/programe">Program</Link>
        </li>
        <li>
          <Link to="/pi-network">About Pi Network</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavPi;
