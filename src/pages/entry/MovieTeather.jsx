import arrowLeft from "@assets/icons/arrow-small-left.png";
import { useFetchData } from "@services/useFetchData";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MovieTeather() {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const { state } = useLocation();
  const { movie } = state || {};

  if (!movie) return null;

  const url = `https://api.themoviedb.org/3/movie/${movie?.id}/videos`;
  const { data, pending, error } = useFetchData(url, options);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="relative z-10">
        <div className="h-lvh bg-rose-700 w-full relative">
          <button
            onClick={handleBack}
            className="absolute w-[65px] top-10 left-10 z-50"
          >
            <img src={arrowLeft} alt="back" />
          </button>
          <div className="w-full">
            <iframe
              className="w-full h-lvh"
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${data?.results[0]?.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      </div>
    </>
  );
}
