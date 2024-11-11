import { useFetchData } from "@services/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link, useNavigate } from "react-router-dom";

export default function MovieLists({ label, url }) {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY || "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const { data, pending, error } = useFetchData(url, options);

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
                className="w-[100px] sm:w-[150px] hover:scale-105 transition-all rounded-md overflow-hidden"
              >
                <Link
                  to={`/home/movie/${movie?.id}`}
                  className="w-full cursor-pointer"
                >
                  <img
                    className="w-full"
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
