import { Outlet, useNavigate, ScrollRestoration } from "react-router-dom";
import { useEffect, useState } from "react";
import welcomeImage from "@assets/images/welcome-image.jpg";

export default function EntryLayout() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authSession = localStorage.getItem("authSession");
    if (authSession) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuth && !loading) {
      navigate("/home");
    }
  }, [isAuth, loading, navigate]);

  return (
    <>
      <div
        className="absolute bg-cover bg-center w-full h-lvh blur opacity-10 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent), url(${welcomeImage})`,
        }}
      ></div>
      <div className="bg-gradient-to-b from-zinc-700 to-black min-h-screen text-white">
        <Outlet />
      </div>
      <ScrollRestoration />
    </>
  );
}
