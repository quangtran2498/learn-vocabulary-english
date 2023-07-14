import React from "react";
import GlobalPopupConfirm, {
  GlobalPopupConfirmRef,
} from "../common/GlobalPopupConfirm";
import PopupService from "../../utils/popupService";

const PopupGlobal = () => {
  PopupService.instance = React.useRef<GlobalPopupConfirmRef | any>(null);

  return (
      <GlobalPopupConfirm ref={PopupService.instance} />
  );
};

export default PopupGlobal;
