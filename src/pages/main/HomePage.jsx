import { useState } from "react";
import Header from "@components/main/Header";
import MovieLists from "@components/main/MovieLists";
import Featured from "@components/main/Featured";
import Footer from "@components/Footer";

export default function HomePage() {
  const [url, setUrl] = useState([
    {
      label: "today's pick",
      url: "https://api.themoviedb.org/3/trending/all/day",
    },
    {
      label: "now playing",
      url: "https://api.themoviedb.org/3/movie/now_playing",
    },
    {
      label: "airing today",
      url: "https://api.themoviedb.org/3/tv/airing_today",
    },
    {
      label: "popular movies",
      url: "https://api.themoviedb.org/3/movie/popular",
    },
    {
      label: "popular TV series",
      url: "https://api.themoviedb.org/3/tv/popular",
    },
    {
      label: "top rated movies",
      url: "https://api.themoviedb.org/3/movie/top_rated",
    },
    {
      label: "top rated TV series",
      url: "https://api.themoviedb.org/3/tv/top_rated",
    },
    {
      label: "upcoming movies",
      url: "https://api.themoviedb.org/3/movie/upcoming",
    },
    {
      label: "on the air",
      url: "https://api.themoviedb.org/3/tv/on_the_air",
    },
  ]);
  const [featured, setFeatured] = useState(
    "https://api.themoviedb.org/3/movie/popular"
  );

  return (
    <>
      <header className="static sm:fixed top-0 right-0 left-0 h-auto z-10">
        <Header />
      </header>
      <main>
        <Featured url={featured} />
        {url.map((list, index) => (
          <MovieLists key={index} label={list.label} url={list.url} />
        ))}
      </main>
      <footer className="container mx-auto max-w-[1200px]">
        <Footer />
      </footer>
    </>
  );
}
