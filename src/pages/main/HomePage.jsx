import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.removeItem("authSession");
    navigate("/login");
  };
  return (
    <>
      <div>HOMEPAGE</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
