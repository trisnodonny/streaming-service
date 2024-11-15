import MovieLists from "./MovieLists";

export default function SearchMovie({ onSearch }) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${onSearch}`;

  if (!onSearch) return null;

  return (
    <>
      <div className="absolute w-full bg-gradient-to-b from-black to-zinc-800 h-screen z-50">
        <MovieLists label={onSearch} url={url} />
      </div>
    </>
  );
}
