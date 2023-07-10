import "./App.css";
import { store } from "./redux";
import { path } from "./contant/path";
import Header from "./components/header";
import React, { useEffect } from "react";
import getHeightHeader from "./hook/getHeight";
import PopupService from "./utils/popupService";
import httpsService from "./service/httpsService";
import { Outlet, useNavigate } from "react-router-dom";
import ReviewLessonsPopup from "./components/contentPopup/reviewLessons";
import GlobalPopupConfirm, { GlobalPopupConfirmRef, } from "./components/common/GlobalPopupConfirm";
// import { ItemLocalstorage } from "./contant/enums";

function App() {
  PopupService.instance = React.useRef<GlobalPopupConfirmRef | any>(null);
  const heightHeader = getHeightHeader();
  const tokenLocal = localStorage.getItem("token");
  const token = tokenLocal || store.getState().auth.token || "";
  httpsService.attachTokenToHeader(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(path.login);
    }
    // PopupService.instance.current.open({
    //   visible: true,
    //   content: <ReviewLessonsPopup />,
    //   onHidePopup:() => {
    //     PopupService.instance.current.close()
    //   }
    // });
  }, []);

  return (
    <div>
      <Header />
      <div className="" style={{ marginTop: `${heightHeader}px` }}>
        <Outlet />
      </div>
      <GlobalPopupConfirm ref={PopupService.instance} />
    </div>
  );
}

export default App;
