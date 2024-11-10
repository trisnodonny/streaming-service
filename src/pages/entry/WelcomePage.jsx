import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "@services/useFetchData";
import Footer from "@components/entry/Footer";
import heroImage from "@assets/images/hero-image.jpg";
import welcomeImage2 from "@assets/images/welcome-image2.jpg";
import exclusive from "@assets/icons/exclusive-new.png";
import noAds from "@assets/icons/no-ads-new.png";
import offlineViewing from "@assets/icons/offline-viewing-new.png";
import personalize from "@assets/icons/personalize-new.png";
import MyModal from "@components/entry/MyModal";

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
    {
      id: 1,
      name: "Exclusive Content",
      icon: exclusive,
    },
    {
      id: 2,
      name: "Personalized Recommendations",
      icon: personalize,
    },
    {
      id: 3,
      name: "Ad-Free Experience",
      icon: noAds,
    },
    {
      id: 4,
      name: "Offline Viewing",
      icon: offlineViewing,
    },
  ]);
  const [showMyModal, setShowMyModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleShowMyModal = (movie) => {
    setShowMyModal(true);
    setSelectedMovie(movie);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseMyModal = () => {
    setShowMyModal(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      <MyModal
        onClose={handleCloseMyModal}
        isVisible={showMyModal}
        movie={selectedMovie}
      />

      <div
        className="absolute bg-cover bg-center w-full h-lvh blur opacity-50"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent), url(${welcomeImage2})`,
        }}
      ></div>

      <div className="relative">
        <header className="container mx-auto max-w-[1400px] relative z-10">
          <div className="flex items-center justify-between p-6 px-8 sm:px-4">
            <Link to={"/"} className="text-sky-700 font-bold text-4xl">
              VM.
            </Link>
            <Link
              className="flex items-center font-medium py-1 px-4 rounded-md bg-sky-700 hover:bg-sky-800 transition-all"
              to="/login"
            >
              Sign In
            </Link>
          </div>
        </header>

        <main className="container mx-auto max-w-[1200px] pb-8 px-8 sm:px-6 md:px-8 relative z-10">
          <div className="flex w-full h-[300px] md:h-[350px] lg:h-[450px] mx-auto mb-4 sm:mb-8">
            <img
              className="w-full object-cover shadow-zinc-500 shadow rounded-lg"
              src={heroImage}
              alt="hero-image"
            />
          </div>
          <div className="max-w-[768px] mx-auto px-4 mb-4 sm:mb-8">
            <p className="text-center text-2xl sm:text-4xl font-bold">
              Stream the latest movies, hit TV shows, and exclusive content—on
              any device, at any time.
            </p>
          </div>
          <div className="w-full mx-auto mb-4 sm:mb-8">
            <p className="text-xl md:text-3xl font-black mb-2 sm:mb-4">
              Reasons to join us
            </p>
            <div className="w-full flex items-stretch flex-wrap justify-between gap-y-2">
              {reasons.map((reason) => (
                <div
                  key={reason.id}
                  className="flex items-center p-4 rounded-[1rem] bg-zinc-800 shadow-zinc-500 shadow lg:flex-col lg:items-start lg:gap-4 lg:justify-between w-full lg:w-[calc(25%-8px)]"
                >
                  <p className="flex w-full font-bold">{reason.name}</p>
                  <div className="flex justify-end w-full">
                    <div className="w-[50px] h-[50px] rounded-full">
                      <img
                        className=""
                        src={reason.icon}
                        alt={reason.name}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mx-auto">
            <div className="text-center mb-2 sm:mb-4">
              <h1 className="text-xl sm:text-4xl font-bold mb-2 sm:mb-8">
                Discover all this and more, only here.
              </h1>
              <p className="text-sm sm:text-xl mb-4 sm:mb-8">
                Myflix is the ultimate destination for a wide variety of
                content, featuring original series, blockbuster movies,
                documentaries, and shows for every age group, from drama to
                comedy to thrillers.
              </p>
            </div>
            <ul className="w-full flex item-stretch flex-wrap justify-between gap-y-4">
              {data?.results?.slice(0, 12).map((movie) => (
                <li
                  key={movie.id}
                  className="w-[calc((100%/2)-10px)] sm:w-[calc((100%/4)-10px)] lg:w-[calc((100%/6)-10px)] rounded-lg overflow-hidden hover:scale-105 transition-all relative cursor-pointer"
                  onClick={() => handleShowMyModal(movie)}
                >
                  <div className="absolute text-sky-700 font-black text-xl left-3 top-2">
                    VM.
                  </div>
                  <img
                    className="w-full"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </li>
              ))}
            </ul>
          </div>
        </main>

        <footer className="container mx-auto max-w-[1200px]">
          <Footer />
        </footer>
      </div>
    </>
  );
}
