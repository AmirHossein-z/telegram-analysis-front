import { Dispatch, JSX, SetStateAction } from "react";
import logo from "../../../assets/logo.svg";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { useMediaMatch } from "../../../hooks";

interface IProps {
  setToggleAside: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

const Navbar = ({ setToggleAside, logout }: IProps): JSX.Element => {
  const [match, _] = useMediaMatch(768);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-primary-content bg-base-100">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {match ? (
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
            ) : null}
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
          {/* logout */}
          <button onClick={logout}>
            <BiLogOut />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
