import Header from "./components/header";
import {Outlet, redirect, useNavigate } from "react-router-dom";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { theme } from "./theme";
import "./App.css";
import getHeightHeader from "./hook/getHeight";
import { useEffect } from "react";
import { path } from "./contant/path";
import { store } from "./redux";

function App() {
  const heightHeader = getHeightHeader();
  const token =  store.getState().auth.token || "";
  console.log(token,"token");
  
  const navigate = useNavigate()
 
  useEffect(() => {
    if (!token) {
      navigate(path.login);
    }
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <div className="" style={{ marginTop: `${heightHeader}px` }}>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
