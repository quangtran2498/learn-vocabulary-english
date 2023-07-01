import Header from "./components/header";
import {Outlet, useNavigate } from "react-router-dom";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { theme } from "./theme";
import "./App.css";
import getHeightHeader from "./hook/getHeight";
import { useEffect } from "react";
import { path } from "./contant/path";
import { store } from "./redux";
import GlobalPopupConfirm, { GlobalPopupConfirmRef } from "./components/common/GlobalPopupConfirm";
import React from "react";
import PopupService from "./utils/PopupService";

function App() {
  PopupService.instance = React.useRef<GlobalPopupConfirmRef | any>(null);
  const heightHeader = getHeightHeader();
  const tokenLocal = localStorage.getItem("token")
  const token =  tokenLocal || store.getState().auth.token || "";
  
  const navigate = useNavigate()
 
  useEffect(() => {
    if (!token) {
      navigate(path.login);
    }
  }, []);


  return (
    <ThemeProvider theme={theme}>
        <GlobalPopupConfirm ref={PopupService.instance} />

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
