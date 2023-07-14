import React, { CSSProperties } from "react";
import { makeStyles } from "@mui/styles";
import { colors } from "../../../colors";

interface PropsI {
  children: string;
  halfWidth?: boolean;
  className?: string;
  onEvent?: () => void;
  style?: CSSProperties;
  disable?:boolean
}

const useStyles = makeStyles((theme) => {
  return {
    default: {
      width: "100%",
      padding: "16px 0",
      fontSize: "16px",
      background: colors.blueMain,
      color: colors.white,
      border: "none",
      borderRadius: "4px",
      textTransform: "capitalize",
      cursor:"pointer"
    },
    halfWidth: {
      width: "48%",
    },
    disable:{
      opacity:0.5
    }
  };
});

const ButtonCommon = (props: PropsI) => {

  const { children, halfWidth, className, onEvent,style,disable } = props;
  const classes = useStyles();
  return (
    <button
      className={`${classes.default} ${
        halfWidth && classes.halfWidth
      } ${className} ${disable && classes.disable}`}
      style={{...style}}
      onClick={onEvent && onEvent}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default ButtonCommon;
