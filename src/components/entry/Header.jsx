import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="container mx-auto max-w-[1400px] relative z-10">
        <div className="flex items-center justify-between pt-6 px-8 sm:py-6 sm:px-4">
          <Link to={"/"} className="text-sky-700 font-bold text-3xl">
            VM.
          </Link>
        </div>
      </header>
    </>
  );
}
