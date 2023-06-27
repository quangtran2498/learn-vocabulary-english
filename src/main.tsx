import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/contact/index.tsx";
import ErrorPage from "./pages/error/index.tsx";
import Home from "./pages/home/index.tsx";
import "./index.css"
import InputVocabulary from "./pages/inputVocabularys/index.tsx";
import PractiveInputVocabularys from "./pages/practive/index.tsx";

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
        path: "input-vocabulary",
        element: <InputVocabulary />,
      },
      {
        path: "practive",
        element: <PractiveInputVocabularys />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
