import React from "react";
import { GlobalPopupConfirmRef } from "../components/common/GlobalPopupConfirm";
class PopupService {
  static instance: React.MutableRefObject<GlobalPopupConfirmRef>;
}

export default PopupService;
