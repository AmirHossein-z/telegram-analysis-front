import { Dispatch, JSX, SetStateAction } from "react";
import logo from "../../../assets/logo.svg";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { useMediaMatch } from "../../../hooks";

interface IProps {
  setToggleAside: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

const Navbar = ({ setToggleAside, logout }: IProps): JSX.Element => {
  const [match] = useMediaMatch(768);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-base-content border-opacity-10 bg-base-100">
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
                className="focus:ring-text-base-100 inline-flex items-center rounded-lg bg-base-100 p-2 text-sm ring-2 focus:outline-none focus:ring-gray-100"
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
              <span className="self-center whitespace-nowrap text-xl font-semibold text-info sm:text-2xl">
                telegram analyzer
              </span>
            </a>
          </div>
          {/* logout */}
          <button onClick={logout} className="flex gap-3 text-error">
            خروج
            <BiLogOut />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
