import { useFetchData } from "@services/useFetchData";
import TrailerPopUp from "@pages/main/TrailerPopUp";
import { useState } from "react";

export default function Featured({ url }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const { data, pending, error } = useFetchData(url, options);
  const randomIndex = Math.floor(Math.random() * data?.results?.length);
  const randomMovie = data?.results[randomIndex];
  const [showTrailer, setShowTrailer] = useState(false);

  const handleShowTrailer = (ev) => {
    ev.preventDefault();
    setShowTrailer(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      <TrailerPopUp
        showTrailer={showTrailer}
        movie={randomMovie}
        onClose={handleCloseTrailer}
      />
      {data?.results && (
        <div className="relative" key={randomMovie?.id}>
          <div className="absolute bottom-10 p-4 sm:p-12 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <h1 className="text-4xl font-black">
                {randomMovie?.name || randomMovie?.title}
              </h1>
              {(randomMovie?.name || randomMovie?.title) !==
                (randomMovie?.original_name || randomMovie?.original_title) && (
                <h1 className="text-4xl font-black">
                  ({randomMovie?.original_name || randomMovie?.original_title})
                </h1>
              )}
            </div>
            <p className="line-clamp-4 max-w-[968px]">
              {randomMovie?.overview}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleShowTrailer}
                className="py-2 px-6 bg-sky-700 hover:bg-sky-800 transition-all rounded-md capitalize"
              >
                see trailer
              </button>
              <button className="py-2 px-6 border hover:bg-zinc-700 transition-all rounded-md capitalize">
                more detail
              </button>
            </div>
          </div>
          <div>
            <div
              className="bg-cover bg-center w-full h-lvh blcok sm:hidden"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url(https://image.tmdb.org/t/p/w500/${randomMovie?.poster_path})`,
              }}
            ></div>
            <div
              className="bg-cover bg-center w-full h-lvh hidden sm:block"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url(https://image.tmdb.org/t/p/w500/${randomMovie?.backdrop_path})`,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
