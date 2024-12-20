import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import fox from "@assets/icons/fox.png";
import search from "@assets/icons/search.png";
import SearchMovie from "./SearchMovie";
import dropDown from "@assets/icons/angle-circle-up.png";
import user from "@assets/icons/user.png";
import settings from "@assets/icons/settings.png";
import logout from "@assets/icons/logout.png";
import plus from "@assets/icons/plus.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const currentLocation = location?.pathname?.split("/");
  const route = currentLocation[currentLocation.length - 1];

  const [links, setLinks] = useState([
    { id: 1, label: "home", route: "/home" },
    { id: 2, label: "movies", route: "/home/movies" },
    { id: 3, label: "series", route: "/home/series" },
    { id: 4, label: "watchlists", route: "/home/watchlists" },
  ]);
  const [username, setUsername] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isShowInputField, setIsShowInputField] = useState(false);
  const [onSearchInput, setOnSearchInput] = useState("");
  const [isDropDown, setIsDropDown] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (isShowInputField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowInputField]);
  useEffect(() => {
    setOnSearchInput("");
  }, [location.pathname]);
  useEffect(() => {
    const authSession = JSON.parse(localStorage.getItem("authSession"));
    if (authSession) {
      setUsername(authSession.username);
    }
  }, []);

  const handleClickMagnify = () => {
    setIsShowInputField((prevState) => !prevState);
  };
  const handleSearchInput = (ev) => {
    const { value } = ev.target;
    setOnSearchInput(value);
  };
  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.removeItem("authSession");
    navigate("/");
  };
  const handleResetSearchInput = () => {
    if (onSearchInput) {
      setOnSearchInput("");
      setIsShowInputField(true);
    }
  };

  return (
    <>
      <div
        className={`${
          onSearchInput !== ""
            ? "bg-black"
            : "bg-gradient-to-b from-black to-black/60"
        }`}
      >
        <div className="container mx-auto max-w-[1400px] relative z-50">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex sm:items-center sm:gap-8 sm:flex-row flex-col mr-4">
              <div className="flex items-center gap-4 bg-black sm:bg-transparent relative bg-black z-50">
                <Link to={"/home"} className="text-sky-700 font-bold text-3xl">
                  VM.
                </Link>
                <div
                  onClick={() => setIsDropDown((prevState) => !prevState)}
                  className="sm:hidden"
                >
                  <img
                    className={`w-5 transition-all ${
                      isDropDown ? "" : "rotate-180"
                    }`}
                    src={dropDown}
                    alt="arrow"
                  />
                </div>
              </div>
              <div
                className={`${
                  screenWidth < 640
                    ? `absolute bg-gradient-to-b from-black to-black/75 left-0 ${
                        isDropDown
                          ? "block top-12 opacity-100 visible"
                          : "top-0 opacity-0 invisible"
                      }`
                    : "bg-transparent"
                } w-full p-4 transition-all`}
              >
                <ul className="flex items-center gap-1 lg:gap-4 sm:justify-center w-full">
                  {links.map((link) => (
                    <li key={link.id}>
                      <Link
                        className={
                          route === link.label
                            ? "border border-zinc-500 px-3 py-1 rounded-xl text-xs sm:border-0 bg-sky-700 text-white font-bold sm:text-base capitalize text-center pointer-events-none sm:bg-transparent sm:text-sky-700"
                            : "border border-zinc-500 px-3 py-1 rounded-xl text-xs sm:border-0 sm:text-base capitalize text-center hover:text-zinc-300 transition-all"
                        }
                        to={link.route}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                {onSearchInput !== "" ? (
                  <div
                    onClick={handleResetSearchInput}
                    className="w-4 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-all z-10 hover:opacity-80"
                  >
                    <img className="w-full rotate-45" src={plus} alt="clear" />
                  </div>
                ) : (
                  <div
                    onClick={handleClickMagnify}
                    className={` ${
                      isShowInputField ? "w-4" : "w-5"
                    } absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-all z-10 hover:opacity-80`}
                  >
                    <img className="w-full" src={search} alt="search" />
                  </div>
                )}
                <input
                  ref={inputRef}
                  className={`${
                    isShowInputField || onSearchInput !== ""
                      ? "w-full opacity-100"
                      : "w-0 pointer-events-none opacity-0"
                  } bg-zinc-700 pl-2 pr-8 py-1 rounded transition-all`}
                  type="text"
                  placeholder="Search.."
                  onChange={handleSearchInput}
                  onBlur={() => setIsShowInputField(false)}
                  value={onSearchInput}
                />
              </div>
              <div className="relative">
                <div
                  className="w-8 cursor-pointer hover:scale-105 transition-all"
                  onClick={() => setIsShow((prevState) => !prevState)}
                >
                  <img className="w-full" src={fox} alt="user" />
                </div>
                {isShow && (
                  <ul className="absolute w-max flex flex-col items-start bg-zinc-800 right-0 mt-4 rounded-md z-50 overflow-hidden">
                    <li className="w-full px-4 py-2">Hi! {username}</li>
                    <li className="w-full px-4 py-2 flex items-center gap-2">
                      <img className="w-4" src={user} alt="user" />
                      <span>Profile</span>
                    </li>
                    <li className="w-full px-4 py-2 flex items-center gap-2">
                      <img className="w-4" src={settings} alt="settings" />
                      <span>Settings</span>
                    </li>
                    <li className="w-full px-4 py-2 flex items-center gap-2 border-zinc-500 hover:bg-zinc-900 border-t-[1px]">
                      <img className="w-4" src={logout} alt="logout" />
                      <button
                        className="w-full hover:underline"
                        onClick={handleLogout}
                      >
                        Sign out of VM.
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchMovie onSearch={onSearchInput} />
    </>
  );
}
