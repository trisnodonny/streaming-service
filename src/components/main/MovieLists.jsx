import { useFetchData } from "@services/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MovieLists({ label, url }) {
  const apiKey = import.meta.env.VITE_API_KEY;
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
      <main className="container mx-auto max-w-[1400px] p-4">
        <div>
          <h1 className="font-extrabold text-3xl mb-4 capitalize">{label}</h1>
          <div className="w-full">
            <Swiper spaceBetween={10} slidesPerView="auto">
              {data?.results?.map((movie) => (
                <SwiperSlide key={movie.id} className="w-[150px]">
                  <div className="w-full cursor-pointer hover:scale-105 transition-all rounded-md overflow-hidden">
                    <img
                      className="w-full"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
    </>
  );
}
