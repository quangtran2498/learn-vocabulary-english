import React, { useState, useImperativeHandle } from 'react';
import PopupConfirm, { PopupConfirmProps } from '../popupComfirm/index';

// export type { PopupConfirmProps } from '../popupComfirm';
export interface GlobalPopupConfirmRef {
  open: (data: PopupConfirmProps) => void;
  close: () => void;
}

const GlobalPopupConfirm = React.forwardRef((props, ref) => {
  const [popupData, setPopupData] = useState<PopupConfirmProps>({
    visible: false,
  });
  useImperativeHandle(ref, () => ({
    open: (data: PopupConfirmProps) => {      
      setPopupData(data);
    },
    close: () => {
      setPopupData({ visible: false });
    },
  }));

  return <PopupConfirm {...popupData} />;
});

export default GlobalPopupConfirm;
