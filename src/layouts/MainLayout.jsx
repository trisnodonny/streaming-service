import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MainLayout() {
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
    if (!isAuth && !loading) {
      navigate("/");
    }
  }, [isAuth, loading, navigate]);

  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <Outlet />
      </div>
    </>
  );
}
