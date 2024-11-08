import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <header className="container mx-auto">
          <div className="md:max-w-[968px] mx-auto p-4 sm:p-8">
            <Link to={"/"} className="text-2xl font-bold">
              Header
            </Link>
          </div>
        </header>
      </header>
    </>
  );
}
