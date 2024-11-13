import { useParams, Link } from "react-router-dom";
import Header from "@components/main/Header";
import { useEffect, useState } from "react";
import { useFetchData } from "@services/useFetchData";
import { durationFormatter } from "../../helpers/durationFormatter";
import Loading from "../../components/Loading";
import TrailerPopUp from "./TrailerPopUp";
import { key } from "@constants/key";

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
      <div
        className="absolute bg-cover bg-center w-full h-lvh blur opacity-50"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent), url(https://image.tmdb.org/t/p/w500/${data?.backdrop_path})`,
        }}
      ></div>
      <Header />
      <TrailerPopUp
        showTrailer={showTrailer}
        movie={data}
        onClose={handleCloseTrailer}
      />
      <main className="container mx-auto max-w-[1200px] pb-8 px-8 sm:px-6 md:px-8 relative z-10">
        <div className="flex gap-8 flex-col sm:flex-row">
          <div className="w-full sm:max-w-[400px] border border-zinc-500 rounded-md overflow-hidden">
            <img
              className="w-full"
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              alt=""
            />
          </div>
          <div className="w-full sm:w-3/5">
            <div className="flex flex-wrap items-center mb-4 gap-4">
              <h1 className="text-2xl sm:text-4xl font-black uppercase">
                {data?.name || data?.title}
              </h1>
              {(data?.name || data?.title) !==
                (data?.original_name || data?.original_title) && (
                <h1 className="text-2xl">
                  ({data?.original_name || data?.original_title})
                </h1>
              )}
            </div>
            <div className="flex gap-2 text-zinc-400">
              <p>{data?.release_date.split("-")[0]}</p>
              <p>{durationFormatter(data?.runtime)}</p>
              <div className="border border-zinc-500 px-2">
                {data?.adult === true ? "18+" : "13+"}
              </div>
            </div>
            <p className="text-sm sm:text-base mb-4">{data?.overview}</p>
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
            <div className="flex gap-2 text-sm w-full">
              <button
                className="py-2 px-6 bg-sky-700 hover:bg-sky-800 transition-all rounded-md capitalize"
                onClick={handleShowTrailer}
              >
                see trailer
              </button>
              <button
                className="py-2 px-6 bg-sky-700 hover:bg-sky-800 transition-all rounded-md capitalize"
                onClick={handleShowTrailer}
              >
                watch now
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
