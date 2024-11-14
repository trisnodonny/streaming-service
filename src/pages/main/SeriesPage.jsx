import Header from "@components/main/Header";
import { useState } from "react";
import MovieLists from "@components/main/MovieLists";

export default function SeriesPage() {
  const [url, setUrl] = useState([
    {
      label: "airing today",
      url: "https://api.themoviedb.org/3/tv/airing_today",
    },
    {
      label: "top rated",
      url: "https://api.themoviedb.org/3/tv/top_rated",
    },
    {
      label: "popular",
      url: "https://api.themoviedb.org/3/tv/popular",
    },
    {
      label: "on the air",
      url: "https://api.themoviedb.org/3/tv/on_the_air",
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
