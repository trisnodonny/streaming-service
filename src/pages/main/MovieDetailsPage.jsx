import { useParams, Link } from "react-router-dom";
import Header from "@components/main/Header";
import { useEffect, useState } from "react";
import { useFetchData } from "@services/useFetchData";
import { durationFormatter } from "@helpers/durationFormatter";
import Loading from "@components/Loading";
import TrailerPopUp from "./TrailerPopUp";
import { key } from "@constants/key";
import check from "@assets/icons/check.png";
import plus from "@assets/icons/plus.png";
import noImage from "@assets/icons/noimage.png";
import Footer from "@components/Footer";

export default function MovieDetailsPage() {
  const apiKey = import.meta.env.VITE_API_KEY || key;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const { id } = useParams();
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/${id}`);
  const { data, isPending, error } = useFetchData(url, options);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isAddedToLibrary, setIsAddedToLibrary] = useState(false);

  const addClass = isAddedToLibrary
    ? "absolute w-max -right-[80px] top-1/2 transform -translate-y-1/2 hidden md:group-hover:flex bg-green-800 px-2 py-1 rounded-md"
    : "absolute w-max -right-[105px] top-1/2 transform -translate-y-1/2 hidden md:group-hover:flex bg-sky-800 px-2 py-1 rounded-md";

  useEffect(() => {
    setUrl(`https://api.themoviedb.org/3/movie/${id}`);
  }, [id]);

  useEffect(() => {
    const library = JSON.parse(localStorage.getItem("myLibrary")) || [];
    const inLibrary = library.find((movie) => movie?.id === data?.id);

    if (inLibrary) {
      setIsAddedToLibrary(true);
    }
  }, [data]);

  const handleAddToLibrary = () => {
    const library = JSON.parse(localStorage.getItem("myLibrary"));
    const libraryArr = library ? library : [];
    const inLibrary = libraryArr.find((movie) => movie?.id === data?.id);

    if (inLibrary) {
      const updatedLibrary = libraryArr.filter((movie) => movie.id !== data.id);
      localStorage.setItem("myLibrary", JSON.stringify(updatedLibrary));
      setIsAddedToLibrary(false);
    } else {
      libraryArr.push(data);
      localStorage.setItem("myLibrary", JSON.stringify(libraryArr));
      setIsAddedToLibrary(true);
    }
  };

  const handleShowTrailer = () => {
    setShowTrailer(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    document.body.classList.remove("overflow-hidden");
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <TrailerPopUp
        showTrailer={showTrailer}
        movie={data}
        onClose={handleCloseTrailer}
      />
      <div
        className="absolute bg-cover bg-center w-full h-lvh blur opacity-50"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent), url(https://image.tmdb.org/t/p/w500/${data?.backdrop_path})`,
        }}
      ></div>
      <Header />
      <main className="container mx-auto max-w-[1200px] p-8 relative z-10">
        <div className="flex gap-8 flex-col sm:flex-row">
          <div className="w-full sm:max-w-64 lg:max-w-72 border border-zinc-500 rounded-md overflow-hidden">
            {data?.poster_path ? (
              <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                alt=""
              />
            ) : (
              <div className="w-full flex items-center justify-center sm:h-[400px] flex-col p-4">
                <div className="max-w-52 p-4">
                  <img
                    className="w-32 sm:w-full"
                    src={noImage}
                    alt="no image"
                  />
                </div>
                <p>Image not found</p>
              </div>
            )}
          </div>
          <div className="w-full sm:w-4/5 flex flex-col gap-4">
            <div className="flex flex-wrap items-center mb-4 gap-2">
              <h1 className="text-2xl sm:text-4xl font-black">
                {data?.name || data?.title}
              </h1>
              {(data?.name || data?.title) !==
                (data?.original_name || data?.original_title) && (
                <h1 className="text-2xl">
                  ({data?.original_name || data?.original_title})
                </h1>
              )}
            </div>
            <div className="flex gap-2 text-sm w-full items-center">
              <Link
                to={`/home/teather/${data?.id}`}
                className="py-2 px-6 bg-sky-700 hover:bg-sky-800 transition-all rounded-md capitalize"
              >
                watch now
              </Link>
              <button
                className="py-2 px-6 border hover:bg-zinc-700 transition-all rounded-md capitalize"
                onClick={handleShowTrailer}
              >
                play trailer
              </button>
              <div className="relative group">
                <button
                  onClick={handleAddToLibrary}
                  className={`w-[30px] h-[30px] z-[60] rounded-full transition-all p-[8px] flex ${
                    isAddedToLibrary
                      ? `bg-green-700 hover:bg-green-800`
                      : `bg-sky-700 hover:bg-sky-800`
                  }`}
                >
                  <img
                    className="w-full"
                    src={isAddedToLibrary ? check : plus}
                    alt={isAddedToLibrary ? "added" : "add"}
                  />
                </button>
                <div className={addClass}>
                  {isAddedToLibrary ? "In Library" : "Add to library"}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-zinc-400">
              <p>{data?.release_date.split("-")[0]}</p>
              <p>{durationFormatter(data?.runtime)}</p>
              <div className="border border-zinc-500 px-2">
                {data?.adult === true ? "18+" : "13+"}
              </div>
            </div>
            <p className="text-sm sm:text-base">{data?.overview}</p>
            <div>
              <div className="flex gap-2 flex-end">
                <p className="text-zinc-500">Genres:</p>
                <ul className="flex gap-2">
                  {data?.genres?.map((genre, index) => (
                    <li
                      key={genre?.id}
                      className={`hover:underline transition-all cursor-pointer ${
                        index === data?.genres?.length - 1
                          ? ""
                          : "after:content-[',']"
                      }`}
                    >
                      {genre?.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <p className="text-zinc-500">Productions:</p>
                <ul className="flex gap-2 flex-wrap">
                  {data?.production_companies?.slice(0, 1).map((item) => (
                    <li
                      key={item?.id}
                      className="hover:underline w-max transition-all cursor-pointer"
                    >
                      {item?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto max-w-[1200px]">
        <Footer />
      </footer>
    </>
  );
}
