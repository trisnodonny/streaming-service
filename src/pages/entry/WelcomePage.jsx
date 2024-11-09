import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "@services/useFetchData";
import Footer from "@components/entry/Footer";
import welcomeImage from '@assets/welcome-image.jpg';

export default function WelcomePage() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzAwMzc1Y2Q5MDEwZGJlMzVkZjE4MDI3YzExYTM3OSIsIm5iZiI6MTczMTExMTUyMC43NTAyNTY1LCJzdWIiOiI2NmUxNmIyYzFiYjEzNDlmZWY0MGE0N2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tH1U0p70QV3OVwuLzmy_L2uT720Y7CDcx7TxrICfEh4",
    },
  };
  const [url, setUrl] = useState("https://api.themoviedb.org/3/movie/popular");
  const { data, isPending, erorr } = useFetchData(url, options);
  const [reasons, setReasons] = useState([
    "Exclusive Content",
    "Personalized Recommendations",
    "Ad-Free Experience",
    "Offline Viewing",
  ]);

  return (
    <>
      <div className="relative bg-gradient-to-b from-zinc-700 to-black min-h-screen">
        <img className="absolute opacity-10 z-0" src={welcomeImage} alt="welcome" />
        <header className="container mx-auto max-w-[1400px] text-white relative z-10">
          <div className="flex items-center justify-between py-6 px-4">
            <div>logo</div>
            <Link
              className="flex items-center font-medium py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-600 transition-all"
              to="/login"
            >
              Sign In
            </Link>
          </div>
        </header>

        <main className="container mx-auto max-w-[1200px] p-8 text-white sm:px-6 md:px-8 relative z-10">
          <div className="w-full bg-blue-200 h-[450px] mx-auto mb-4 sm:mb-8"></div>
          <div className="max-w-[720px] mx-auto px-4 mb-4 sm:mb-8">
            <p className="text-center text-2xl sm:text-4xl font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="w-full mx-auto mb-4 sm:mb-8">
            <p className="text-xl md:text-3xl font-bold mb-2 sm:mb-4">
              Lorem ipsum dolor sit.
            </p>
            <div className="w-full flex items-stretch flex-wrap justify-between gap-y-2">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-[1rem] bg-zinc-800 border border-zinc-700 lg:flex-col lg:items-start lg:gap-8 lg:justify-between w-full lg:w-[calc(25%-8px)]"
                >
                  <p className="flex w-full">{reason}</p>
                  <div className="flex justify-end w-full">
                    <div className="w-[50px] h-[50px] lg:w-[25px] lg:h-[25px] bg-white"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mx-auto">
            <div className="text-center mb-2 sm:mb-4">
              <h1 className="font-bold text-5xl mb-2 sm:mb-4">
                Lorem ipsum dolor sit.
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
                consequatur!
              </p>
            </div>
            <ul className="w-full flex item-stretch flex-wrap justify-between gap-y-4">
              {data?.results?.slice(0, 12).map((movie, index) => (
                <li
                  key={index}
                  className="w-[calc((100%/2)-10px)] sm:w-[calc((100%/4)-10px)] lg:w-[calc((100%/6)-10px)] rounded-lg overflow-hidden hover:scale-105 transition-all"
                >
                  <Link to={"/login"}>
                    <img
                      className="w-full"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <footer className="text-white">
          <Footer />
        </footer>
      </div>
    </>
  );
}
