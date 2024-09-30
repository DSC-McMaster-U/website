import { Link } from "@remix-run/react";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between">
      <ul className="flex flex-row">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newsletter">Events</Link>
        </li>
        <li>
          <Link to="/event">Newsletters</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/discord">Join our discord</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
