import { JSX, useState } from "react";
import profileImg from "../../../assets/profile.png";

const NavProfile = (): JSX.Element => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <div className="flex items-center">
      <div className="relative ml-3 flex items-center">
        <div>
          <button
            type="button"
            className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
            onClick={() => setDropdown((prevState) => !prevState)}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src={profileImg}
              alt="user photo"
            />
          </button>
        </div>
        <div
          className={`z-50 ${
            dropdown ? "absolute left-6 top-3" : "hidden"
          } my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700`}
          id="dropdown-user"
        >
          <div className="px-4 py-3" role="none">
            <p className="text-sm text-gray-900 dark:text-white" role="none">
              Neil Sims
            </p>
            <p
              className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
              role="none"
            >
              neil.sims@flowbite.com
            </p>
          </div>
          <ul className="py-1" role="none">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavProfile;
