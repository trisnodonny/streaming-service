import { useFetchData } from "@services/useFetchData";
import MovieTeather from "@pages/entry/MovieTeather";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Featured({ url }) {
  const navigate = useNavigate();
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

  const handleWatchMovie = (movie) => {
    if (movie) {
      navigate("/home/teather", { state: { movie } });
    }
  };

  return (
    <>
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
                onClick={() => handleWatchMovie(randomMovie)}
                className="py-2 px-6 bg-sky-700 hover:bg-sky-800 transition-all rounded-md capitalize"
              >
                watch now
              </button>
              <button className="py-2 px-6 border hover:bg-zinc-900 transition-all rounded-md capitalize">
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
