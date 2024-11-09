import { Link } from "react-router-dom";
import cross from "@assets/icons/cross.png";

export default function MyModal({ onClose, isVisible, movie }) {
  const handleClose = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bg-black bg-opacity-70 flex justify-center items-center inset-0 z-40">
        <div className="relative max-w-[600px] shadow-sm shadow-zinc-400 overflow-hidden rounded-md bg-gradient-to-t from-cyan-black to-transparent z-10">
          <div>
            <div className="relative">
              <button
                onClick={handleClose}
                className="absolute w-[45px] top-2 right-2 hover:bg-gray-50/20 p-3 rounded-full transition-all"
              >
                <img className="w-full" src={cross} alt="close" />
              </button>
              <img
                className="w-full z-0"
                src={`https://image.tmdb.org/t/p/w500//${movie.backdrop_path}`}
                alt=""
              />
              <div className="flex items-center gap-2 absolute bottom-4 left-8">
                <span className="text-sky-700 font-bold text-3xl">VM.</span>
                <span className="uppercase">Series</span>
              </div>
            </div>
            <div className="p-8 flex flex-col gap-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <ul className="flex gap-4">
                <li>{movie.release_date.split("-")[0]}</li>
              </ul>
              <p className="line-clamp-2">{movie.overview}</p>
              <div className="py-2 px-4 bg-sky-700 hover:bg-sky-800 rounded-lg w-max cursor-pointer transition-all">
                <Link to={"/login"}>Start Watching</Link>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={handleClose}
          className="fixed top-0 left-0 right-0 bottom-0 flex"
        ></div>
      </div>
    </>
  );
}
