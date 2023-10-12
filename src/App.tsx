import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import GlobalPopupConfirm, {
  GlobalPopupConfirmRef,
} from "./components/common/GlobalPopupConfirm";
import { path } from "./contant/path";
import getHeightHeader from "./hook/getHeight";
import { store } from "./redux";
import httpsService from "./service/httpsService";
import PopupService from "./utils/popupService";
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
      <div className="" >
        <Outlet />
      </div>
      <GlobalPopupConfirm ref={PopupService.instance} />
    </div>
  );
}

export default App;
