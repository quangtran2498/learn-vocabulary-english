import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/contact/index.tsx";
import ErrorPage from "./pages/error/index.tsx";
import Home from "./pages/home/index.tsx";
import "./index.css";
import InputVocabulary from "./pages/inputVocabularys/index.tsx";
import PractiveInputVocabularys from "./pages/practive/index.tsx";
import VocabularyCustom from "./pages/vocabularyCustom/index.tsx";
import Login from "./pages/login/index.tsx";
import SignUp from "./pages/signUp/index.tsx";
import Games from "./pages/games/index.tsx";
import ImageVocabulary from "./pages/games/childs/imageVocabulary.tsx";
import DemoGames from "./pages/games/childs/demo.tsx";
import GameGun from "./pages/games/childs/gun.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
