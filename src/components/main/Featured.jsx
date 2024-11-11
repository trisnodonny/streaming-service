import { useFetchData } from "@services/useFetchData";
import welcomeImage2 from "@assets/images/welcome-image2.jpg";

export default function Featured({ url }) {
  const key =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzAwMzc1Y2Q5MDEwZGJlMzVkZjE4MDI3YzExYTM3OSIsIm5iZiI6MTczMTExMTUyMC43NTAyNTY1LCJzdWIiOiI2NmUxNmIyYzFiYjEzNDlmZWY0MGE0N2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tH1U0p70QV3OVwuLzmy_L2uT720Y7CDcx7TxrICfEh4";
  const apiKey = import.meta.env.VITE_API_KEY || key;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const { data, pending, error } = useFetchData(url, options);
  console.log(data, "<><><><>");
  return (
    <>
      {data?.results?.slice(0, 1).map((movie) => (
        <div className="relative" key={movie.id}>
          <div className="absolute bottom-0">
            <h1>{movie.name}</h1>
            <p>{movie.overview}</p>
            <div>
              <button>Play</button>
              <button>Detail</button>
            </div>
          </div>
          <div
            className="bg-cover bg-center w-full h-lvh"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent), url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
            }}
          ></div>
        </div>
      ))}
    </>
  );
}
