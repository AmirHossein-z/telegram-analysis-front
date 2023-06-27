import { Dispatch, JSX, SetStateAction, useState } from "react";
import logo from "../../assets/logo.svg";
import profileImg from "../../assets/profile.png";
import { BiMenu } from "react-icons/bi";

interface IProps {
  setToggleAside: Dispatch<SetStateAction<boolean>>;
}
const Navbar = ({ setToggleAside }: IProps): JSX.Element => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-primary-content bg-base-100">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              onClick={() => {
                setToggleAside((prevState) => !prevState);
              }}
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <BiMenu />
            </button>
            <a href="https://flowbite.com" className="mr-2 flex md:ml-24">
              <img
                src={logo}
                alt="لوگوی سایت"
                // className="w-40 h-40 sm:w-44 sm:h-44 lg:40 mx-auto p-2"
                className="ml-3 h-12 w-12"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                telegram analyzer
              </span>
            </a>
          </div>
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
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
