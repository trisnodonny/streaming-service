import { useFetchData } from "@services/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MovieLists({ label, url }) {
  const apiKey =
    import.meta.env.VITE_API_KEY ||
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzAwMzc1Y2Q5MDEwZGJlMzVkZjE4MDI3YzExYTM3OSIsIm5iZiI6MTczMTExMTUyMC43NTAyNTY1LCJzdWIiOiI2NmUxNmIyYzFiYjEzNDlmZWY0MGE0N2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tH1U0p70QV3OVwuLzmy_L2uT720Y7CDcx7TxrICfEh4";
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
              <SwiperSlide key={movie?.id} className="w-[100px] sm:w-[150px]">
                <div className="w-full cursor-pointer hover:scale-105 transition-all rounded-md overflow-hidden">
                  <img
                    className="w-full"
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next text-white hover:scale-110 transition-all" />
            <div className="swiper-button-prev text-white" />
          </Swiper>
        </div>
      </div>
    </>
  );
}
