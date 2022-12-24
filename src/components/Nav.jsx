import { GoSettings } from "react-icons/go";
const Nav = () => {
  return (
    <nav>
      <ul className="py-[1rem] flex justify-end relative">
        <GoSettings className="text-3xl" />
      </ul>
      <div className="grid grid-cols-12">
        <ul className="flex justify-around col-span-10">
          <li>
            <a href="" className="text-gray-400">
              Alarm
            </a>
          </li>
          <li>
            <a href="" className="nav-active">
              Stop Watch
            </a>
          </li>
          <li>
            <a href="" className="text-gray-400">
              Timer
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Nav;
