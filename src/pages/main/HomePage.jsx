import { useState } from "react";
import Header from "@components/main/Header";
import MovieLists from "@components/main/MovieLists";
import Featured from "@components/main/Featured";
import Footer from "@components/main/Footer";
import { key } from "@constants/key";

export default function HomePage() {
  const apiKey = import.meta.env.VITE_API_KEY || key;
  const [url, setUrl] = useState([
    {
      label: "today's pick",
      url: "https://api.themoviedb.org/3/trending/all/day",
    },
    {
      label: "trending tv show",
      url: "https://api.themoviedb.org/3/trending/tv/day",
    },
    {
      label: "now playing",
      url: "https://api.themoviedb.org/3/movie/now_playing",
    },
    {
      label: "top rated",
      url: "https://api.themoviedb.org/3/movie/top_rated",
    },
    {
      label: "popular",
      url: "https://api.themoviedb.org/3/movie/popular",
    },
  ]);
  const [featured, setFeatured] = useState(
    "https://api.themoviedb.org/3/movie/popular"
  );

  return (
    <>
      <header className="fixed top-0 right-0 left-0 h-auto z-10">
        <Header />
      </header>
      <main>
        <Featured url={featured} />
        {url.map((movie, index) => (
          <MovieLists key={index} label={movie.label} url={movie.url} />
        ))}
      </main>
      <Footer />
    </>
  );
}
