import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userIcon from "@assets/icons/user-icon.png";
import search from "@assets/icons/search.png";
import SearchMovie from "./SearchMovie";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location?.pathname?.split("/");
  const route = currentLocation[currentLocation.length - 1];

  const [links, setLinks] = useState([
    { id: 1, label: "home", route: "/home" },
    { id: 2, label: "movies", route: "/home/movies" },
    { id: 3, label: "TV series", route: "/home/series" },
    { id: 4, label: "watchlists", route: "/home/watchlists" },
  ]);
  const [username, setUsername] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isShowInputField, setIsShowInputField] = useState(false);
  const [onSearchInput, setOnSearchInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isShowInputField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowInputField]);

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

  useEffect(() => {
    const authSession = JSON.parse(localStorage.getItem("authSession"));

    if (authSession) {
      setUsername(authSession.username);
    }
  }, []);

  return (
    <>
      <div
        className={`${
          onSearchInput !== ""
            ? "bg-black"
            : "bg-gradient-to-b from-black to-black/60"
        }`}
      >
        <div className="container mx-auto max-w-[1400px] relative z-10">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex sm:items-center gap-4 sm:gap-8 sm:flex-row flex-col mr-4">
              <Link to={"/home"} className="text-sky-700 font-bold text-3xl">
                VM.
              </Link>
              <ul className="absolute sm:static top-16s sm:flex items-center lg:gap-4 justify-center">
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
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  onClick={handleClickMagnify}
                  className={`${
                    isShowInputField ? `w-4` : `w-5`
                  } absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-all z-10`}
                >
                  <img className="w-full" src={search} alt="serach" />
                </div>
                <input
                  ref={inputRef}
                  className={`${
                    isShowInputField || onSearchInput !== ""
                      ? "w-full opacity-100"
                      : "w-0 pointer-event-none opacity-0"
                  } bg-zinc-700 pl-2 pr-8 py-1 rounded transition-all`}
                  type="text"
                  placeholder="Search.."
                  onChange={handleSearchInput}
                  onBlur={() => setIsShowInputField(false)}
                  value={onSearchInput}
                  autoFocus
                />
              </div>
              <div className="relative">
                <div
                  className="w-8 cursor-pointer hover:scale-105 transition-all"
                  onClick={() => setIsShow((prevState) => !prevState)}
                >
                  <img className="w-full" src={userIcon} alt="user" />
                </div>
                {isShow && (
                  <div className="absolute w-max flex flex-col items-start bg-zinc-800 right-0 mt-4 rounded-md z-50 overflow-hidden">
                    <span className="w-max p-4">Hi! {username}</span>
                    <button
                      className="w-max border-t-[1px] border-zinc-500 w-full p-4 hover:bg-zinc-900"
                      onClick={handleLogout}
                    >
                      Sign out of VM.
                    </button>
                  </div>
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
