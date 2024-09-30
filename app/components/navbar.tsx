import { Link } from "@remix-run/react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-row justify-center items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newsletter">Newsletter</Link>
        </li>
        <li>
          <Link to="/event">Event</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
