import { Link } from "@remix-run/react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-row justify-between items-center">
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
    </nav>
  );
}

export default Navbar;
