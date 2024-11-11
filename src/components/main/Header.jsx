import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userIcon from "@assets/icons/user-icon.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location?.pathname?.split("/");
  const route = currentLocation[currentLocation.length - 1];

  const [links, setLinks] = useState([
    { id: 1, label: "home", route: "/home" },
    { id: 2, label: "movies", route: "/home/movies" },
    { id: 3, label: "series", route: "/home/series" },
    { id: 4, label: "kids", route: "/home/kids" },
  ]);
  const [username, setUsername] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const linkClass = isSelected
    ? "uppercase font-bold text-sm pointer-events-none"
    : "uppercase font-medium text-sm";

  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.removeItem("authSession");
    navigate("/login");
  };

  useEffect(() => {
    const authSession = JSON.parse(localStorage.getItem("authSession"));

    if (authSession) {
      setUsername(authSession.username);
    }
  });

  return (
    <>
      <header className="container mx-auto max-w-[1400px] relative z-10">
        <div className="flex items-center justify-between pt-6 px-8 sm:py-6 sm:px-4">
          <div className="flex items-center gap-8">
            <Link to={"/home"} className="text-sky-700 font-bold text-3xl">
              VM.
            </Link>
            <ul className="flex items-center gap-8 justify-center">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    className={
                      route === link.label
                        ? "capitalize text-center text-sm pointer-events-none text-sky-700"
                        : "capitalize text-center text-sm hover:text-zinc-300 transition-all"
                    }
                    to={link.route}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-8">
            <span>Hi! {username}</span>
            <button onClick={handleLogout}>Logout</button>
            <div className="w-[40px]">
              <img src={userIcon} alt="user" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
