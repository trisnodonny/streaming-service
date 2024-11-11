import { useState } from "react";
import Header from "@components/main/Header";
import MovieLists from "@components/main/MovieLists";
import Featured from "@components/main/Featured";

export default function HomePage() {
  const [topRatedUrl, setTopRatedUrl] = useState(
    "https://api.themoviedb.org/3/movie/top_rated"
  );
  const [popularUrl, setPopularUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular"
  );
  const [nowPlayingUrl, setNowPlayingUrl] = useState(
    "https://api.themoviedb.org/3/movie/now_playing"
  );

  return (
    <>
      <header className="sticky top-0 h-auto z-10">
        <Header />
      </header>
      <Featured />
      <MovieLists label="now playing" url={nowPlayingUrl} />
      <MovieLists label="top rated" url={topRatedUrl}/>
      <MovieLists label="popular" url={popularUrl} />
    </>
  );
}
