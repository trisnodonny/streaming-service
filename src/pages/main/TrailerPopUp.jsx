import { useFetchData } from "@services/useFetchData";
import Loading from "../../components/Loading";
import { key } from "@constants/key";

export default function TrailerPopUp({ showTrailer, movie, onClose }) {
  const apiKey = import.meta.env.VITE_API_KEY || key;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const url = `https://api.themoviedb.org/3/movie/${movie?.id}/videos`;
  const { data, isPending, error } = useFetchData(url, options);

  const videoKey = data?.results?.find(
    (video) => video?.site === "YouTube" && video?.type === "Trailer"
  )?.key;

  const handleClose = () => {
    onClose();
  };

  if (!showTrailer) return null;

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white text-xl z-50 bg-zinc-800 hover:bg-rose-600 rounded-full transition-colors"
        >
          ✖
        </button>
        {videoKey ? (
          <div className="relative w-full max-w-4xl h-[50vh] sm:h-[70vh] rounded-lg bg-gradient-to-b from-zinc-600 to-zinc-900 overflow-hidden">
            <iframe
              className="w-full h-full shadow-zinc-500 shadow"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
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
