import React, { useEffect, CSSProperties } from "react";
import { makeStyles } from "@mui/styles";
import HeaderCloseModal from "../../headerCloseModal";
import { sourceImages } from "../../../assets";
export interface PopupConfirmProps {
  visible: boolean;
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  content?: React.ReactNode | string;
  onHidePopup?: () => void;
  onCancel?: () => void;
  icon?: string | React.ReactNode;
  footer?: React.ReactNode;
  path?: string;
  styleTitle?: CSSProperties;
  disableBtn?: boolean | string;
  btnClose?: React.ReactNode;
  descErrorDefault?:string
}

const iconDefault = sourceImages.icons.icon

const useStyles = makeStyles((theme) => {
  return {
    icon: {
      ...theme.custom?.flexBox.horizontalCenter,
      padding: "12px 0 16px 0",
    },
    TextTitle: {
      fontSize: "18px",
      color: theme.custom?.text.title,
      textAlign: "center",
      marginBottom: "16px",
      fontWeight: 'bold',
    },
    textDesc: {
      textAlign: "center",
      marginTop: "0",
      color: "#000000",
      lineHeight: "20px",
      marginBottom: "16px",
      fontSize: "14px",
    },
    content: {
      background: theme.custom?.background.white,
      borderRadius: "16px",
      padding: "16px 16px",
      width: "100%",
      margin: "0 16px",
      maxWidth: "400px",
    },
    modal: {
      background: "rgba(0, 0, 0, 0.6)",
      position: "fixed",
      width: "100%",
      height: "100vh",
      ...theme.custom?.flexBox.centerCenter,
      zIndex: 99999999,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };
});

const PopupConfirm = (props: PopupConfirmProps) => {
  const {
    visible,
    onHidePopup,
    content,
    title,
    icon,
    footer,
    path,
    styleTitle,
    disableBtn,
    btnClose,
    descErrorDefault,
    ...rest
  } = props;

  const classes = useStyles();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  if (!visible) return <div />;
  const preventEvent = (event:any) => {
    event.stopPropagation();
  };
  
  return (
    <div className={`${classes.modal} popup-global`} onClick={onHidePopup}>
      <div className={classes.content} onClick={preventEvent}>
        {btnClose ? (
          <>{btnClose}</>
        ) : (
          <HeaderCloseModal onClose={onHidePopup} />
        )}

        {icon ? (
          typeof icon === "string" ? (
            <div className={classes.icon}>
              <img
                style={{ width: "131px", height: "127px" }}
                src={icon}
                alt=""
              />
            </div>
          ) : (
            <>{icon}</>
          )
        ) : (
          <div className={classes.icon}>
            <img
              style={{ width: "131px", height: "127px" }}
              src={iconDefault}
              alt=""
            />
          </div>
        )}
        <div
          className={classes.TextTitle}
          style={styleTitle}
        >
          {title || "Thông báo"}
        </div>
        <div className="">{content}</div>
        {descErrorDefault && (
          <div>
            <div className={classes.textDesc}>{descErrorDefault}</div>
            <button onClick={onHidePopup}>Đóng</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default PopupConfirm;
