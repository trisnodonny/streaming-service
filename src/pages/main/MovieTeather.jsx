import { key } from "@constants/key";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchData } from "@services/useFetchData";
import Loading from "@components/Loading";
import arrowLeft from "@assets/icons/arrow-small-left.png";
import play from "@assets/icons/play.png";
import forward from "@assets/icons/10sec-for.png";
import backward from "@assets/icons/10sec-back.png";
import fullScreen from "@assets/icons/fullscreen.png";
import { runTimeFormatter } from "@helpers/runTimeFormatter";

export default function MovieTeather() {
  const apiKey = import.meta.env.VITE_API_KEY || key;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const { id } = useParams();

  const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
  const urlDetails = `https://api.themoviedb.org/3/movie/${id}`;
  const { data, isPending, error } = useFetchData(url, options);
  const {
    data: details,
    isPending: detailsPending,
    error: errorPending,
  } = useFetchData(urlDetails, options);

  const videoKey = data?.results?.find(
    (video) => video?.site === "YouTube" && video?.type === "Trailer"
  )?.key;

  const buttonControlClass =
    "w-6 hover:opacity-70 cursor-pointer transition-all";

  if (isPending) return <Loading />;

  return (
    <>
      <div className="flex items-center justify-center h-screen relative">
        <Link
          className="flex absolute top-4 left-4 z-50 hover:opacity-70 transition-all"
          to={`/home/movie/${data?.id}`}
        >
          <img className="w-[60px]" src={arrowLeft} alt="back" />
        </Link>
        <div className="absolute z-50 bottom-0 p-4 w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-center gap-4">
            <div className="w-full flex items-center relative">
              <span className="w-4 h-4 bg-sky-700 hover:bg-sky-800 cursor-pointer rounded-full"></span>
              <span className="w-full h-1 rounded opacity-30 bg-white"></span>
            </div>
            <p className="w-max">{runTimeFormatter(details?.runtime)}</p>
            <img
              className={buttonControlClass}
              src={fullScreen}
              alt="fullscreen"
            />
          </div>
          <div className="w-full flex items-center justify-center gap-6">
            <img className={buttonControlClass} src={backward} alt="backward" />
            <img className={buttonControlClass} src={play} alt="play" />
            <img className={buttonControlClass} src={forward} alt="forward" />
          </div>
        </div>
        {videoKey ? (
          <iframe
            className="w-full h-[576px]"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&controls=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        ) : (
          <p>NO TRAILER</p>
        )}
      </div>
    </>
  );
}
