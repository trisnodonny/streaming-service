import Header from "@components/main/Header";
import MovieLists from "@components/main/MovieLists";
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

  return (
    <>
      <Header />
      <main>
        {url.map((list, index) => (
          <MovieLists key={index} label={list.label} url={list.url} />
        ))}
      </main>
    </>
  );
}
