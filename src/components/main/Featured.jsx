import { useFetchData } from "@services/useFetchData";
import welcomeImage2 from "@assets/images/welcome-image2.jpg";

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

  return (
    <>
      {data?.results && (
        <div className="relative" key={randomMovie?.id}>
          <div className="absolute bottom-12 p-4 sm:p-12">
            <h1 className="text-4xl font-black">{randomMovie?.name}</h1>
            <p className="line-clamp-4">{randomMovie?.overview}</p>
            <div>
              <button className="py-2 px-4 bg-sky-700">Play</button>
              <button className="py-2 px-4 border border-white">Detail</button>
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
