import ThemeProvider from "@mui/styles/ThemeProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Contact from "./pages/contact/index.tsx";
import ErrorPage from "./pages/error/index.tsx";
import DemoGames from "./pages/games/childs/demo.tsx";
import GameGun from "./pages/games/childs/gun.tsx";
import ImageVocabulary from "./pages/games/childs/imageVocabulary.tsx";
import Games from "./pages/games/index.tsx";
import Home from "./pages/home/index.tsx";
import InputVocabulary from "./pages/inputVocabularys/index.tsx";
import Login from "./pages/login/index.tsx";
import PractiveInputVocabularys from "./pages/practive/index.tsx";
import ReviewLessons from "./pages/reviewLessons/index.tsx";
import SignUp from "./pages/signUp/index.tsx";
import UserVocabulary from "./pages/userVocabulary/index.tsx";
import VocabularyCustom from "./pages/vocabularyCustom/index.tsx";
import { theme } from "./theme/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "user-vocabulary",
        element: <UserVocabulary />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "review-lessons",
    element: <ReviewLessons />,
  },
  {
    path: "vocabulary-custom",
    element: <VocabularyCustom />,
    children: [
      {
        path: "input-vocabulary",
        element: <InputVocabulary />,
      },
      {
        path: "practive",
        element: <PractiveInputVocabularys />,
      },
    ],
  },
  {
    path: "games",
    element: <Games />,
    children: [
      {
        path: "demo",
        element: <DemoGames />,
      },
      {
        path: "image-vocabulary",
        element: <ImageVocabulary />,
      },
      {
        path: "gun",
        element: <GameGun />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(  
  <React.StrictMode>
    <div className="">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  </React.StrictMode>
);
