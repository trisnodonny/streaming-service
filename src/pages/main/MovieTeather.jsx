import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchData } from "@services/useFetchData";
import Loading from "@components/Loading";
import arrowLeft from "@assets/icons/arrow-small-left.png";

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
  // const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/${id}`);
  // const { data, isPending, error } = useFetchData(url, options);

  const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
  const { data, isPending, error } = useFetchData(url, options);

  const videoKey = data?.results?.find(
    (video) => video?.site === "YouTube" && video?.type === "Trailer"
  )?.key;

  if (isPending) return <Loading />;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <Link
          className="flex absolute top-4 left-4 z-50"
          to={`/home/movie/${data?.id}`}
        >
          <img className="w-[60px]" src={arrowLeft} alt="back" />
        </Link>
        {videoKey ? (
          <div className="relative w-full h-full flex justify-center items-center overflow-hidden z-0">
            <iframe
              className="w-full h-4/5"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            <div className="text-white">
              <h1></h1>
            </div>
          </div>
        ) : (
          <p>NO TRAILER</p>
        )}
      </div>
    </>
  );
}
