import { createBrowserRouter } from "react-router-dom";
import EntryLayout from "@layouts/EntryLayout";
import MainLayout from "@layouts/MainLayout";
import LoginPage from "@pages/entry/LoginPage";
import RegisterPage from "@pages/entry/RegisterPage";
import WelcomePage from "@pages/entry/WelcomePage";
import HomePage from "@pages/main/HomePage";
import MoviesPage from "@pages/main/MoviesPage";
import SeriesPage from "@pages/main/SeriesPage";
import MovieDetailsPage from "@pages/main/MovieDetailsPage";
import LibraryPage from "@pages/main/LibraryPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <EntryLayout />,
      children: [
        {
          index: true,
          element: <WelcomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/home",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/home/movies",
          element: <MoviesPage />,
        },
        {
          path: "/home/series",
          element: <SeriesPage />,
        },
        {
          path: "/home/movie/:id",
          element: <MovieDetailsPage />,
        },
        {
          path: "/home/library",
          element: <LibraryPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatRoutes: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
