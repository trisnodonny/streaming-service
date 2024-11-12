import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userIcon from "@assets/icons/user-icon.png";
import search from "@assets/icons/search.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location?.pathname?.split("/");
  const route = currentLocation[currentLocation.length - 1];

  const [links, setLinks] = useState([
    { id: 1, label: "home", route: "/home" },
    { id: 2, label: "movies", route: "/home/movies" },
    { id: 3, label: "series", route: "/home/series" },
    { id: 4, label: "library", route: "/home/library" },
  ]);
  const [username, setUsername] = useState("");
  const [isShow, setIsShow] = useState(false);

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
  });

  return (
    <>
      <div className="bg-black bg-opacity-50">
        <div className="container mx-auto max-w-[1400px] relative z-10">
          <div className="flex items-start sm:items-center justify-between py-6 px-8 sm:py-6 sm:px-4">
            <div className="flex sm:items-center gap-4 sm:gap-8 sm:flex-row flex-col ">
              <Link to={"/home"} className="text-sky-700 font-bold text-3xl">
                VM.
              </Link>
              <ul className="flex items-center gap-2 sm:gap-6 justify-center">
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
            <div className="absolute right-8 flex items-center gap-6 sm:static">
              <div className="w-[20px]">
                <img src={search} alt="serach" />
              </div>
              <div className="relative">
                <div
                  className="w-[40px] cursor-pointer hover:scale-105 transition-all"
                  onClick={() => setIsShow((prevState) => !prevState)}
                >
                  <img src={userIcon} alt="user" />
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
    </>
  );
}
