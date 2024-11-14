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
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          onClick={handleClose}
          className="absolute inset-0 bg-black bg-opacity-80"
        ></div>
        <div className="w-full flex items-center justify-center h-auto">
          <div className="w-full flex items-center justify-end flex-col max-w-4xl bg-zinc-900 rounded-md overflow-hidden z-50 border border-zinc-700">
            <div className="relative z-50 flex justify-between items-center w-full p-2">
              <p className="font-bold text-xl px-2">
                {movie?.title || movie?.name}
              </p>
              <button
                onClick={handleClose}
                className="w-8 h-8 text-white text-xl z-50 bg-zinc-700 hover:bg-rose-600 rounded-full transition-colors"
              >
                ✖
              </button>
            </div>
            {videoKey ? (
              <div className="relative w-full h-[50vh] sm:h-[70vh]">
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
              <div className="w-full justify-center items-center flex h-60 flex-col">
                <p className="text-bold">TRAILER NOT AVAILABLE</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
