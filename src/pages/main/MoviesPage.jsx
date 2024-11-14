import Header from "@components/main/Header";
import MovieLists from "@components/main/MovieLists";
import Featured from "@components/main/Featured";
import { useState } from "react";

export default function MoviesPage() {
  const [url, setUrl] = useState([
    {
      label: "now playing",
      url: "https://api.themoviedb.org/3/movie/now_playing",
    },
    {
      label: "popular",
      url: "https://api.themoviedb.org/3/movie/popular",
    },
    {
      label: "top rated",
      url: "https://api.themoviedb.org/3/movie/top_rated",
    },
    {
      label: "upcoming",
      url: "https://api.themoviedb.org/3/movie/upcoming",
    },
  ]);
  const [featured, setFeatured] = useState(
    "https://api.themoviedb.org/3/movie/top_rated"
  );

  return (
    <>
      <header className="static sm:fixed top-0 right-0 left-0 h-auto z-10">
        <Header />
      </header>
      <Featured url={featured} />
      <main>
        {url.map((list, index) => (
          <MovieLists key={index} label={list.label} url={list.url} />
        ))}
      </main>
    </>
  );
}
