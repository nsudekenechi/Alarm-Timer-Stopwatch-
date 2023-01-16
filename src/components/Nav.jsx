import { GoSettings } from "react-icons/go";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav>
      <ul className="py-[1rem] flex justify-end relative">
        <GoSettings className="text-3xl" />
      </ul>
      <div className="grid grid-cols-12">
        <ul className="flex justify-around col-span-10 font-[Sofia Sans]">
          <li>
            <NavLink
              to="/stopwatch"
              className={({ isActive }) =>
                isActive ? "nav-active " : "nav-inactive"
              }
            >
              Stop Watch
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
            >
              Alarm
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/timer"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
            >
              Timer
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Nav;
