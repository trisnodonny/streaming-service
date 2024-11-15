import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useFetchData } from "@services/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
import { key } from "@constants/key";
import { useEffect, useState } from "react";
import goldStar from "@assets/icons/gold-star2.png";
import plus from "@assets/icons/plus.png";
import check from "@assets/icons/check.png";
import Loading from "@components/Loading";

export default function MovieLists({ label, url }) {
  const apiKey = import.meta.env.VITE_API_KEY || key;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const { data, isPending, error } = useFetchData(url, options);
  const [isAddedToLibrary, setIsAddedToLibrary] = useState([]);

  useEffect(() => {
    const library = JSON.parse(localStorage.getItem("myLibrary")) || [];
    const initialLibraryState = library.reduce((acc, movie) => {
      acc[movie.id] = true;
      return acc;
    }, {});
    setIsAddedToLibrary(initialLibraryState);
  }, []);

  const handleAddToLibrary = (selectedMovie) => {
    const library = JSON.parse(localStorage.getItem("myLibrary"));
    const libraryArr = library ? library : [];
    const inLibrary = libraryArr.find(
      (movie) => movie?.id === selectedMovie?.id
    );

    if (inLibrary) {
      const updatedLibrary = libraryArr.filter(
        (movie) => movie.id !== selectedMovie.id
      );
      localStorage.setItem("myLibrary", JSON.stringify(updatedLibrary));
      setIsAddedToLibrary((prev) => ({ ...prev, [selectedMovie.id]: false }));
    } else {
      libraryArr.push(selectedMovie);
      localStorage.setItem("myLibrary", JSON.stringify(libraryArr));
      setIsAddedToLibrary((prev) => ({ ...prev, [selectedMovie.id]: true }));
    }
  };

  // if (isPending) return <Loading />;

  return (
    <>
      <div className="container mx-auto max-w-[1400px] p-4">
        <div className="mb-4">
          <h1 className="font-extrabold text-xl sm:text-3xl mb-4 capitalize">
            {label}
          </h1>
          <Swiper
            className="p-4 -m-4"
            spaceBetween={10}
            slidesPerView="auto"
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
          >
            {data?.results?.map((movie) => (
              <SwiperSlide
                key={movie?.id}
                className="w-[100px] sm:w-[175px] hover:scale-105 hover:z-50 transition-all rounded-md overflow-hidden relative group z-0"
              >
                <div className="group-hover:block hidden">
                  <button
                    onClick={() => handleAddToLibrary(movie)}
                    className={`absolute top-2 right-2 w-[30px] h-[30px] z-[60] rounded-full transition-all p-[8px] flex ${
                      isAddedToLibrary[movie.id]
                        ? "bg-green-700 hover:bg-green-800"
                        : "bg-sky-700 hover:bg-sky-800"
                    }`}
                  >
                    <img
                      className="w-full"
                      src={isAddedToLibrary[movie?.id] ? check : plus}
                      alt={isAddedToLibrary[movie?.id] ? "added" : "add"}
                    />
                  </button>
                </div>
                <Link to={`/home/movie/${movie?.id}`}>
                  <div className="absolute z-50 p-2 bg-gradient-to-t from-black to-transparent w-full h-full flex flex-col justify-between group-hover:flex hidden transition-all">
                    <div className="w-max flex items-center gap-1 border py-1 px-2 rounded-full bg-black bg-opacity-70">
                      <img
                        className="w-[12px] flex"
                        src={goldStar}
                        alt="star"
                      />
                      <div className="text-sm font-bold flex items-center justify-center">
                        {movie?.vote_average.toFixed(1)}
                      </div>
                    </div>
                    <p className="flex flex-wrap gap-x-1 text-xs font-bold">
                      <span>{movie?.name || movie?.title}</span>
                      {(movie?.name || movie?.title) !==
                        (movie?.original_name || movie?.original_title) && (
                        <span>
                          ({movie?.original_name || movie?.original_title})
                        </span>
                      )}
                    </p>
                  </div>
                  <img
                    className="w-full z-10"
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </SwiperSlide>
            ))}
            <div className="hidden sm:block">
              <div className="swiper-button-next text-white hover:scale-110 transition-all" />
              <div className="swiper-button-prev text-white" />
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
}
